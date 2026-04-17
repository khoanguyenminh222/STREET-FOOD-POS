import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const donHangs = await prisma.donHang.findMany({
      orderBy: {
        ngayTao: 'desc',
      },
    });
    
    // Parse JSON string back to object for list
    const mappedOrders = donHangs.map(dh => ({
      ...dh,
      items: JSON.parse(dh.danhSachMonAn),
      // Map back to temporary state field names if needed by UI
      maDonHang: dh.maDonHang,
      timestamp: dh.ngayTao.getTime(),
    }));

    return NextResponse.json(mappedOrders);
  } catch (error) {
    console.error('API GET Orders Error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    const newDonHang = await prisma.donHang.create({
      data: {
        maDonHang: data.id || `ORD-${Date.now().toString().slice(-6)}`,
        tongTien: data.total,
        tamTinh: data.subtotal,
        tienGiamGia: data.discountAmount || 0,
        phanTramGiamGia: data.discountPercent || 0,
        phuongThucTT: data.paymentMethod === 'cash' ? 'tien_mat' : 'chuyen_khoan',
        trangThai: data.status === 'paid' ? 'da_tra' : (data.status === 'pending' ? 'da_luu' : 'huy'),
        danhSachMonAn: JSON.stringify(data.items),
      },
    });

    return NextResponse.json(newDonHang);
  } catch (error) {
    console.error('API POST Orders Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
