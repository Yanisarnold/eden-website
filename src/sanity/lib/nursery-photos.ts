import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { NURSERY_PHOTOS, type NurseryPhoto } from '../../data/nursery-media'  // adjust to your file's real name/path

export async function getNurseryPhotos(): Promise<Record<string, NurseryPhoto[]>> {
  const docs: { slug: string; photos?: any[] }[] = await client.fetch(
    `*[_type == "nurseryLocation"]{ slug, photos[]{ alt, asset, crop, hotspot } }`
  )
  const result = { ...NURSERY_PHOTOS }
  for (const doc of docs) {
    if (!doc.photos?.length) continue
    result[doc.slug] = doc.photos.map((p) => ({
      src: urlFor(p).width(1200).height(810).fit('crop').auto('format').url(),
      alt: p.alt ?? `Eden ${doc.slug} nursery`,
    }))
        console.log(JSON.stringify(docs.map(d => ({ slug: d.slug, count: d.photos?.length })), null, 2))

  }
  return result
}