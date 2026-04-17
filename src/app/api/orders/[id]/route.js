import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request, context) {
  try {
    const { id } = context.params;
    const data = await request.json();

    const updated = await prisma.donHang.update({
      where: { maDonHang: id },
      data: {
        trangThai: data.status === 'paid' ? 'da_tra' : (data.status === 'pending' ? 'da_luu' : 'huy'),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('API PATCH Order Error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = context.params;

    const deleted = await prisma.donHang.delete({
      where: { maDonHang: id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error('API DELETE Order Error:', error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
