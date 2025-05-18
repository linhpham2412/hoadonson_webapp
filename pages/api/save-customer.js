import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const customerData = req.body;

    // Generate a unique filename
    const filename = `customers/${Date.now()}-${customerData.phone}.json`;

    // Save to Vercel Blob Storage
    const blob = await put(filename, JSON.stringify(customerData), {
      access: 'public',
      contentType: 'application/json'
    });

    return res.status(200).json({
      success: true,
      url: blob.url
    });

  } catch (error) {
    console.error('Blob storage error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}