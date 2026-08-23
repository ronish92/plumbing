
import { notFound } from 'next/navigation';
import ServiceBookingPage from '@/components/service-details';
import { services } from '@/data/service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
 {
  const {slug} = await params;

   


    const service = services.find(
    (service) => service.slug === slug
  );
 
  
  if (!service) {
    notFound();
  }

  return <ServiceBookingPage service={service} />;
}
}