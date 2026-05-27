import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const sanitizeLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
const sanitizeMultiline = (s: string) => s.replace(/\r/g, "").trim();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    let body: { name?: unknown; email?: unknown; message?: unknown };
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid JSON" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, message } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid field types" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cleanName = sanitizeLine(name).slice(0, 100);
    const cleanEmail = sanitizeLine(email).slice(0, 254);
    const cleanMessage = sanitizeMultiline(message).slice(0, 5000);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!emailRegex.test(cleanEmail)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, message: "Field length exceeds maximum allowed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailPayload = {
      subject: `Portfolio Contact: Message from ${cleanName}`,
      content: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
      recipient: "ndungueliud2020@gmail.com",
      from_name: "Eliud's Portfolio Contact Form",
      reply_to: cleanEmail,
      reply_name: cleanName,
    };

    const response = await fetch("https://www.fixafrica.co.ke/carenthusiast/api/email/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    });

    const rawResponse = await response.text();
    let data: Record<string, unknown> = {};

    try {
      data = rawResponse ? JSON.parse(rawResponse) : {};
    } catch {
      data = { message: rawResponse };
    }

    if (!response.ok || data.success !== true) {
      console.error("Email provider rejected contact message", {
        status: response.status,
        response: data,
      });

      return new Response(
        JSON.stringify({ success: false, message: "Email provider failed to send message" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
