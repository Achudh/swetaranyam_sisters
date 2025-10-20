import { json } from "@sveltejs/kit";
import { nhost } from "$lib/nhost";

export const POST = async ({ request }: { request: Request }) => {
  try {
    const { name, email, organization, phone, message } = await request.json();

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const mutation = `
      mutation InsertContactSubmissions($name: String, $email: String, $organization: String, $phone: String, $message: String) {
        insert_contact_submissions(objects: {name: $name, email: $email, organization: $organization, phone: $phone, message: $message}) {
          affected_rows
        }
      }
    `;

    const variables = {
      name: String(name).trim(),
      email: String(email).trim(),
      organization: organization ? String(organization).trim() : "",
      phone: phone ? String(phone).trim() : "",
      message: String(message).trim(),
    };

    // pass variables directly (not wrapped in `input`)
    const response = await nhost.graphql.request({
      query: mutation,
      variables: variables,
    });

    // normalize to actual GraphQL response shape
    const result = response.body;

    if (result.errors) {
      console.error("❌ Error inserting:", result.errors);
      return json(
        {
          success: false,
          error: "Failed to store message. Please try again later.",
        },
        { status: 500 }
      );
    }

    console.log("✅ Inserted contact:", result.data);
    return json({ success: true });
  } catch (err) {
    console.error("GraphQL/write error:", err);
    return json(
      {
        success: false,
        error: "Failed to store message. Please try again later.",
      },
      { status: 500 }
    );
  }
};
