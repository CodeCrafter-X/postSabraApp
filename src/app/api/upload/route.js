import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Set maximum file size 10MB
const MAX_SIZE = 10 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = [
  "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain"
];

export const config = {
  api: {
    bodyParser: false, // must remain false for file uploads
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size too large. Maximum 10MB allowed." },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "File type not allowed. Allowed types: images, PDF, Word, Excel, text files.",
        },
        { status: 400 }
      );
    }

    // Convert file to buffer (in-memory)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const extension = file.name.split(".").pop();
    const uniqueFileName = `${uuidv4()}.${extension}`;

    // For production, instead of saving locally, you can upload `buffer` to cloud storage here.
    // For now, we return the file metadata and a dummy URL:
    const fileUrl = `https://dummy-storage-url.com/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      url: fileUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}
