import fs from 'fs';
import path from 'path';

export const saveFile = async (file) => {
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  
  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  
  // Convert file to buffer and save
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  fs.writeFileSync(filePath, buffer);
  
  return `/uploads/${fileName}`;
};

export const deleteFile = (filePath) => {
  const fullPath = path.join(process.cwd(), 'public', filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    return true;
  }
  return false;
};