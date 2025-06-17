import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PurchaseOrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: PurchaseOrder | null;
  onEdit: () => void;
  onReceive: () => void;
}

interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseOrderItem[];
  expectedDeliveryDate: Date;
  status: 'pending' | 'approved' | 'delivered';
  notes?: string;
  createdAt: Date;
  total: number;
}

interface PurchaseOrderItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export const PurchaseOrderDetailModal: React.FC<PurchaseOrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
  onEdit,
  onReceive,
}) => {
  if (!order) return null;

  const statusMap = {
    pending: 'Pendente',
    approved: 'Aprovado',
    delivered: 'Entregue',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido de Compra</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Fornecedor</h3>
              <p>{order.supplierName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{statusMap[order.status]}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Data de Criação</h3>
              <p>{format(order.createdAt, "dd/MM/yyyy", { locale: ptBR })}</p>
            </div>
            <div>
              <h3 className="font-semibold">Data Prevista de Entrega</h3>
              <p>{format(order.expectedDeliveryDate, "dd/MM/yyyy", { locale: ptBR })}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Itens</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-right">Qtd</th>
                    <th className="p-2 text-right">Preço Unit.</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.itemId} className="border-t">
                      <td className="p-2">{item.itemName}</td>
                      <td className="p-2 text-right">{item.quantity}</td>
                      <td className="p-2 text-right">
                        {item.unitPrice.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="p-2 text-right">
                        {item.total.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr className="border-t">
                    <td colSpan={3} className="p-2 font-semibold text-right">
                      Total:
                    </td>
                    <td className="p-2 font-semibold text-right">
                      {order.total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {order.notes && (
            <div>
              <h3 className="font-semibold">Observações</h3>
              <p>{order.notes}</p>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            {order.status === 'pending' && (
              <>
                <Button onClick={onEdit}>Editar</Button>
                <Button onClick={onReceive}>Receber</Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
