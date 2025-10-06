// src/routes/contact/+server.ts
import { json } from '@sveltejs/kit';
import { db } from '../../lib/server/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const POST = async ({ request }: { request: Request }) => {
  try {
    const { name, email, organization, phone, message } = await request.json();

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Sanitize and normalize all fields
    const data = {
      name: String(name).trim(),
      email: String(email).trim(),
      organization: organization ? String(organization).trim() : '',
      phone: phone ? String(phone).trim() : '',
      message: String(message).trim(),
      createdAt: serverTimestamp()
    };

    // Write to Firestore
    await addDoc(collection(db, 'contact_submissions'), data);

    return json({ success: true });
  } catch (err) {
    console.error('Firestore write error:', err);

    // Provide a safe error message to the client
    return json(
      { success: false, error: 'Failed to store message. Please try again later.' },
      { status: 500 }
    );
  }
};
