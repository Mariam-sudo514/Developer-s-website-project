import { NextResponse } from 'next/server';
import { getHelloMessage, createHelloGreeting } from '@/lib/hello';

export async function GET() {
	const data = getHelloMessage()
	return NextResponse.json(data);
}

export async function POST(req) {
	const { name } = await req.json();
	const greeting = createHelloGreeting(name);
	return NextResponse.json(greeting);
}
