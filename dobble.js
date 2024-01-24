const imageMap = {
  0: "./image/image_part_001.jpg",
  1: "./image/image_part_002.jpg",
  2: "./image/image_part_003.jpg",
  3: "./image/image_part_004.jpg",
  4: "./image/image_part_005.jpg",
  5: "./image/image_part_006.jpg",
  6: "./image/image_part_007.jpg",
  7: "./image/image_part_008.jpg",
  8: "./image/image_part_009.jpg",
  9: "./image/image_part_010.jpg",
  10: "./image/image_part_011.jpg",
  11: "./image/image_part_012.jpg",
  12: "./image/image_part_013.jpg",
  13: "./image/image_part_014.jpg",
  14: "./image/image_part_015.jpg",
  15: "./image/image_part_016.jpg",
  16: "./image/image_part_017.jpg",
  17: "./image/image_part_018.jpg",
  18: "./image/image_part_019.jpg",
  19: "./image/image_part_020.jpg",
  20: "./image/image_part_021.jpg",
  21: "./image/image_part_022.jpg",
  22: "./image/image_part_023.jpg",
  23: "./image/image_part_024.jpg",
  24: "./image/image_part_025.jpg",
  25: "./image/image_part_026.jpg",
  26: "./image/image_part_027.jpg",
  27: "./image/image_part_028.jpg",
  28: "./image/image_part_029.jpg",
  29: "./image/image_part_030.jpg",
  30: "./image/image_part_031.jpg",
  31: "./image/image_part_032.jpg",
  32: "./image/image_part_033.jpg",
  33: "./image/image_part_034.jpg",
  34: "./image/image_part_035.jpg",
  35: "./image/image_part_036.jpg",
  36: "./image/image_part_037.jpg",
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function DobbleCards(n) {
  let cards = [];

  for (let i = 0; i < n; i++) {
    let symbols = [0];
    for (let j = 1; j < n; j++) {
      symbols.push(i * (n - 1) + j);
    }
    cards.push(symbols.slice());
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      let symbols = [i];
      for (let sym = 1; sym < n; sym++) {
        symbols.push(1 + sym * (n - 1) + (((i - 1) * (sym - 1) + j) % (n - 1)));
      }
      cards.push(symbols.slice());
    }
  }
  return cards;
}

const generateCards = (images = imageMap) => {
  let container = document.createElement("div");
  container.className = "block_container";
  document.body.appendChild(container);

  document.getElementById("root").classList.toggle("hide");

  let deck = DobbleCards(8);

  for (const element of deck) {
    let card = shuffle(element);
    let circle = document.createElement("div");
    circle.className = "circle";

    const rows = [2, 3, 3];
    let currentIndex = 0;
    rows.forEach((count, index) => {
      const row = document.createElement("div");
      row.className = "row";

      for (let i = 0; i < count; i++) {
        const item = document.createElement("div");
        item.className = "image_container";

        const randomAngle = Math.floor(Math.random() * 360) + 1;
        const randomScaleBig = Math.random() + 1;
        const randomScaleSmall = Math.random() * 0.3 + 0.7;

        const isCorner =
          (index === 0 && i === 0) || (index === 2 && (i === 0 || i === 2));

        item.style.transform = `rotate(${randomAngle}deg) scale(${
          isCorner ? randomScaleSmall : randomScaleBig
        })`;

        const digit = card[currentIndex++];

        const img = document.createElement("img");
        img.className = "img";
        img.src = images[digit];
        img.alt = digit;

        item.appendChild(img);
        row.appendChild(item);
      }

      circle.appendChild(row);
    });

    container.appendChild(circle);
  }
};

async function getZipContents() {
  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files;

  if (files.length === 0) {
    console.log("No files selected.");
    return;
  }

  const zipFile = files[0];

  const reader = new FileReader();
  reader.onload = async function (event) {
    const arrayBuffer = event.target.result;

    try {
      const zip = await JSZip.loadAsync(arrayBuffer);

      console.log("Zip file contents:");
      const imageUrls = [];

      await Promise.all(
        Object.keys(zip.files).map(async (relativePath) => {
          console.log(relativePath);

          const zipEntry = zip.files[relativePath];
          const blob = await zipEntry.async("blob");
          const imageUrl = URL.createObjectURL(blob);

          imageMap[Object.keys(imageMap).length] = imageUrl;
          imageUrls.push(imageUrl);
        })
      );

      console.log("imageUrls:", imageUrls);

      generateCards(imageUrls);
    } catch (error) {
      console.error("Error reading zip file:", error);
    }
  };

  reader.readAsArrayBuffer(zipFile);
}
