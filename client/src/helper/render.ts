import * as JSZip from 'jszip'

export const imageMap: Record<number, string> = {
  0: '../assets/image/image_part_001.jpg',
  1: './assets/image/image_part_002.jpg',
  2: './assets/image/image_part_003.jpg',
  3: './assets/image/image_part_004.jpg',
  4: './assets/image/image_part_005.jpg',
  5: './assets/image/image_part_006.jpg',
  6: './assets/image/image_part_007.jpg',
  7: './assets/image/image_part_008.jpg',
  8: './assets/image/image_part_009.jpg',
  9: './assets/image/image_part_010.jpg',
  10: './assets/image/image_part_011.jpg',
  11: './assets/image/image_part_012.jpg',
  12: './assets/image/image_part_013.jpg',
  13: './assets/image/image_part_014.jpg',
  14: './assets/image/image_part_015.jpg',
  15: './assets/image/image_part_016.jpg',
  16: './assets/image/image_part_017.jpg',
  17: './assets/image/image_part_018.jpg',
  18: './assets/image/image_part_019.jpg',
  19: './assets/image/image_part_020.jpg',
  20: './assets/image/image_part_021.jpg',
  21: './assets/image/image_part_022.jpg',
  22: './assets/image/image_part_023.jpg',
  23: './assets/image/image_part_024.jpg',
  24: './assets/image/image_part_025.jpg',
  25: './assets/image/image_part_026.jpg',
  26: './assets/image/image_part_027.jpg',
  27: './assets/image/image_part_028.jpg',
  28: './assets/image/image_part_029.jpg',
  29: './assets/image/image_part_030.jpg',
  30: './assets/image/image_part_031.jpg',
  31: './assets/image/image_part_032.jpg',
  32: './assets/image/image_part_033.jpg',
  33: './assets/image/image_part_034.jpg',
  34: './assets/image/image_part_035.jpg',
  35: './assets/image/image_part_036.jpg',
  36: './assets/image/image_part_037.jpg',
}

export const chunk = function <T>(arr: T[], size: number) {
  const res = []

  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size))
  }

  return res
}

export function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function RenderCards(n: number): number[][] {
  const cards = []

  for (let i = 0; i < n; i++) {
    const symbols = [0]
    for (let j = 1; j < n; j++) {
      symbols.push(i * (n - 1) + j)
    }
    cards.push(symbols.slice())
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      const symbols = [i]
      for (let sym = 1; sym < n; sym++) {
        symbols.push(1 + sym * (n - 1) + (((i - 1) * (sym - 1) + j) % (n - 1)))
      }
      cards.push(symbols.slice())
    }
  }
  return cards
}

// export const generateCards = (images: Record<number, string> = imageMap) => {
//   const deck = RenderCards(8)

//   for (const element of deck) {
//     const card = shuffle(element)
//     const circle = document.createElement('div')
//     circle.className = 'circle'

//     const rows = [2, 3, 3]
//     let currentIndex = 0
//     rows.forEach((count, index) => {
//       const row = document.createElement('div')
//       row.className = 'row'

//       for (let i = 0; i < count; i++) {
//         const item = document.createElement('div')
//         item.className = 'image_container'

//         const randomAngle = Math.floor(Math.random() * 360) + 1
//         const randomScaleBig = Math.random() + 1
//         const randomScaleSmall = Math.random() * 0.3 + 0.7

//         const isCorner =
//           (index === 0 && i === 0) || (index === 2 && (i === 0 || i === 2))

//         item.style.transform = `rotate(${randomAngle}deg) scale(${
//           isCorner ? randomScaleSmall : randomScaleBig
//         })`

//         const digit = card[currentIndex++]

//         const img = document.createElement('img')
//         img.className = 'img'
//         img.src = images[digit]
//         img.alt = String(digit)

//         item.appendChild(img)
//         row.appendChild(item)
//       }

//       circle.appendChild(row)
//     })

//     container.appendChild(circle)
//   }
// }

export async function getZipContents(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    const files = fileInput.files

    if (files.length === 0) {
      console.log('No files selected.')
      resolve([])
    }

    const zipFile = files[0]
    const reader = new FileReader()

    reader.onload = async function (event) {
      const arrayBuffer = event.target.result as ArrayBuffer

      try {
        const zip = await JSZip.loadAsync(arrayBuffer)

        console.log('Zip file contents:')
        const imageUrls: string[] = []

        await Promise.all(
          Object.keys(zip.files).map(async (relativePath) => {
            console.log(relativePath)

            const zipEntry = zip.files[relativePath]
            const blob = await zipEntry.async('blob')
            const imageUrl = URL.createObjectURL(blob)

            imageUrls.push(imageUrl)
          }),
        )

        console.log('imageUrls:', imageUrls)
        resolve(imageUrls)
      } catch (error) {
        console.error('Error reading zip file:', error)
        reject(error)
      }
    }

    reader.readAsArrayBuffer(zipFile)
  })
}
