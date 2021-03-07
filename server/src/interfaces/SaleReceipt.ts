import { ISalesInvoicesFilter } from './SaleInvoice';

export interface ISaleReceipt {
  id?: number;
  customerId: number;
  depositAccountId: number;
  receiptDate: Date;
  sendToEmail: string;
  referenceNo: string;
  receiptMessage: string;
  receiptNumber: string;
  amount: number;
  statement: string;
  closedAt: Date | string;
  entries: any[];
}

export interface ISalesReceiptsFilter {}

export interface ISaleReceiptDTO {
  customerId: number;
  depositAccountId: number;
  receiptDate: Date;
  sendToEmail: string;
  referenceNo?: string;
  receiptNumber?: string,
  receiptMessage: string;
  statement: string;
  closed: boolean;
  entries: any[];
}

export interface ISalesReceiptService {
  createSaleReceipt(
    tenantId: number,
    saleReceiptDTO: ISaleReceiptDTO
  ): Promise<void>;

  editSaleReceipt(tenantId: number, saleReceiptId: number): Promise<void>;

  deleteSaleReceipt(tenantId: number, saleReceiptId: number): Promise<void>;

  salesReceiptsList(
    tennatid: number,
    salesReceiptsFilter: ISalesReceiptsFilter
  ): Promise<{
    salesReceipts: ISaleReceipt[];
    pagination: IPaginationMeta;
    filterMeta: IFilterMeta;
  }>;
}
