
import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
   message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return deleteFile(req, res);
      default:
         return res.status(404).json({
            message: 'This endpoint does not exist'
         })
   }
}
const deleteFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { data } = req.body;
   const publicId = data.match(/\/v\d+\/(.+)\./)[1];
   await cloudinary.uploader.destroy(publicId);
   return res.status(200).json({ message: 'ok' });
}
