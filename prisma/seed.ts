import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Cek apakah data games sudah ada, jika belum baru buat
  const existingGames = await prisma.games.count();
  if (existingGames === 0) {
    await prisma.games.createMany({
      data: [
        {
          name: 'Mobile Legends: Bang Bang',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.ourastore.com%2Fourastore.com%2Fproduct%2FMLBBIndofix-ezgif.com-optijpeg.jpg&w=3840&q=75',
          publisher: 'Moonton',
          useServer: true,
        },
        {
          name: 'PUBG Mobile',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fb94ea08a-6890-4dfd-8073-7b8479722504.png&w=3840&q=75',
          publisher: 'Level Infinite',
          useServer: false,
        },
        {
          name: 'Free Fire',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F2b2b481e-89fe-474f-a27d-be791df405cb.jpg&w=3840&q=75',
          publisher: 'Garena',
          useServer: false,
        },
        {
          name: 'Genshin Impact',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Fbbcbed30-004a-490e-80da-6da748fe302f.jpg&w=3840&q=75',
          publisher: 'HoYoverse',
          useServer: true,
        },
        {
          name: 'Valorant',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F7881fb56-29c7-4baa-9e1e-539615b1d0aa.jpg&w=3840&q=75',
          publisher: 'Riot Games',
          useServer: false,
        },
        {
          name: 'Call of Duty: Mobile',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F741e9167-79ff-4e4d-bd71-f9ddb26b173b.jpg&w=3840&q=75',
          publisher: 'Activision',
          useServer: false,
        },
        {
          name: 'Arena of Valor',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F532e8ca5-1967-46f8-a6b4-bc55aa501a16.jpg&w=3840&q=75',
          publisher: 'TiMi Studios',
          useServer: false,
        },
        {
          name: 'Roblox',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.ourastore.com%2F851d17fe-155d-4230-98cc-678dfdd2da56.jpg&w=1920&q=75',
          publisher: 'Roblox Corporation',
          useServer: false,
        },
        {
          name: 'Minecraft',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.ourastore.com%2Fourastore.com%2Fproduct%2Fmincraft-ezgif.com-optijpeg.jpg&w=1920&q=75',
          publisher: 'Mojang Studios',
          useServer: false,
        },
        {
          name: 'Clash of Clans',
          image:
            'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2F41e1b5a0-ffac-494f-8104-8bcfbb0de9cb.webp&w=1920&q=75',
          publisher: 'Supercell',
          useServer: false,
        },
      ],
    });

    console.log('✅ Games berhasil ditambahkan.');
  } else {
    console.log(
      `ℹ️ Games sudah ada (${existingGames} total), skip seeding games.`,
    );
  }

  const games = await prisma.games.findMany();
  const iconUrl =
    'https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.bangjeff.com%2Fc899cd64-bfde-430f-ad34-8f28ae241558.png&w=1920&q=75';

  // List nama diamond package
  const diamondOptions = [
    '3 Diamonds',
    '5 Diamonds',
    '11 (10+1) Diamonds',
    '14 Diamonds',
    '18 (17+1) Diamonds',
    '36 (33+3) Diamonds',
    '44 (40+4) Diamonds',
    '53 (48+5) Diamonds',
    '59 (53+6) Diamonds',
    '74 (66+8) Diamonds',
    '85 (76+9) Diamonds',
    '89 (80+9) Diamonds',
    '108 (96+12) Diamonds',
    '170 (150+20) Diamonds',
    '185 (160+25) Diamonds',
    '222 (192+30) Diamonds',
    '284 (240+44) Diamonds',
    '370 (312+58) Diamonds',
    '429 (360+69) Diamonds',
    '568 (480+88) Diamonds',
    '600 Diamonds',
    '720 (600+120) Diamonds',
    '875 (720+155) Diamonds',
    '1.450 (1.200+250) Diamonds',
    '2.180 (1.800+380) Diamonds',
    '3.560 (2.960+600) Diamonds',
    '7.290 (6.000+1.290) Diamonds',
  ];

  for (const game of games) {
    const existingPrefix = await prisma.prefixCode.count({
      where: { gameId: game.id },
    });

    if (existingPrefix >= 20) {
      console.log(`ℹ️ Prefix untuk game "${game.name}" sudah ada, skip.`);
      continue;
    }

    const prefixCodes = Array.from({ length: 20 }).map(() => ({
      gameId: game.id,
      code: faker.string.alphanumeric(10).toUpperCase(),
      icon: iconUrl,
      type: 'Voucher',
      name: faker.helpers.arrayElement(diamondOptions),
      description: faker.commerce.productDescription(),
      stock: faker.number.int({ min: 10, max: 100 }),
      price: faker.number.int({ min: 10000, max: 100000 }),
      fee: faker.number.int({ min: 1000, max: 5000 }),
    }));

    await prisma.prefixCode.createMany({
      data: prefixCodes,
      skipDuplicates: true,
    });

    console.log(
      `✅ Prefix untuk game "${game.name}" ditambahkan (${prefixCodes.length} kode).`,
    );
  }

  const countries = [
    {
      name: 'Indonesia',
      code: 'ID',
      currencyCode: 'IDR',
      icon: 'https://react-circle-flags.pages.dev/id.svg',
    },
    {
      name: 'Philippines',
      code: 'PH',
      currencyCode: 'PHP',
      icon: 'https://react-circle-flags.pages.dev/ph.svg',
    },
    {
      name: 'Singapore',
      code: 'SG',
      currencyCode: 'SGD',
      icon: 'https://react-circle-flags.pages.dev/sg.svg',
    },
    {
      name: 'Malaysia',
      code: 'MY',
      currencyCode: 'MYR',
      icon: 'https://react-circle-flags.pages.dev/my.svg',
    },
    {
      name: 'Thailand',
      code: 'TH',
      currencyCode: 'THB',
      icon: 'https://react-circle-flags.pages.dev/th.svg',
    },
  ];

  for (const country of countries) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: {},
      create: {
        name: country.name,
        code: country.code,
        currencyCode: country.currencyCode,
        icon: country.icon,
      },
    });
  }

  console.log('🎉 Seeder selesai dijalankan.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
