import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/constants/metadata';
import { routing } from '@/utils/navigation';

export const metadata: Metadata = buildMetadata(routing.defaultLocale);

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
