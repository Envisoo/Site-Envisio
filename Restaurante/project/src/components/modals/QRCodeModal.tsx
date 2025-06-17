import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    id: string;
    nome: string;
    tipo: string;
  };
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const qrData = JSON.stringify({
    id: data.id,
    nome: data.nome,
    tipo: data.tipo,
  });

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${data.nome}</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
              }
              .container {
                text-align: center;
              }
              .qr-code {
                margin-bottom: 20px;
              }
              .info {
                font-family: Arial, sans-serif;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="qr-code">
                ${document.getElementById('qr-code')?.innerHTML || ''}
              </div>
              <div class="info">
                <h2>${data.nome}</h2>
                <p>ID: ${data.id}</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>QR Code - {data.nome}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <div id="qr-code">
            <QRCodeSVG
              value={qrData}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
         
          <div className="text-center">
            <p className="font-semibold">{data.nome}</p>
            <p className="text-sm text-gray-500">ID: {data.id}</p>
          </div>

          <Button onClick={handlePrint} className="w-full">
            Imprimir QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};