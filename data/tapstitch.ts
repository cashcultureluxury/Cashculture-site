// AUTO-GENERATED from the Tapstitch product-cost export (2026-06-14).
// Maps each storefront product (data/essentials.ts ids) to its Tapstitch
// Item ID and every variant's connected sales-platform Variant ID (UUID) + SKU.
// Regenerate by re-running the import against a fresh Tapstitch export.
//
// NOT YET MAPPED (no confident Tapstitch match — left out on purpose):
//   ess-hoodie-artwar195  (Art War $1.95 Hoodie — Tapstitch only lists Art War TEES)
//   ess-tee-artwar195     ("Art War" acid-wash tee — ambiguous: ART WAR $1.95 TEE vs Acid Wash Oversize)
//   ess-shorts-luxshort   (Luxury Short Shorts — no clear match)
//   ess-shorts-luxury     (Luxury Shorts — no clear match)
//   ess-bottoms-szapants  (SZA Sweat Pants — no SZA bottoms in the export)

export type TapstitchVariant = {
  /** Connected sales-platform variant id (UUID). */
  variantId: string;
  /** Tapstitch production SKU (human-readable, stable). */
  sku: string;
  color?: string;
  size?: string;
};

export type TapstitchProduct = {
  /** Tapstitch Item ID (product-level). */
  itemId: string;
  title: string;
  variants: TapstitchVariant[];
};

// Keyed by storefront product id (data/essentials.ts).
export const TAPSTITCH_BY_PRODUCT: Record<string, TapstitchProduct> = {
  "ess-hoodie-teddy": {
    itemId: "1307286884963311616",
    title: "TEDDY HOODIES",
    variants: [
      { color: "Black", size: "S", variantId: "81138a67-7078-4a9e-b1c1-d659613d1daf", sku: "241116PODRB0724#001" },
      { color: "Black", size: "M", variantId: "45dea29d-8b6a-4cc0-abbb-5668db22eb75", sku: "241116PODRB0724#002" },
      { color: "Black", size: "L", variantId: "90fbf6bf-9624-4150-9ea5-fe214dd0cf87", sku: "241116PODRB0724#003" },
      { color: "Black", size: "XL", variantId: "25c50b7a-ad64-4459-8a09-1e935c8a16da", sku: "241116PODRB0724#004" },
      { color: "Black", size: "2XL", variantId: "ce056ec3-6fac-4c37-9ff8-559025073246", sku: "241116PODRB0724#005" },
    ],
  },
  "ess-hoodie-feelgood": {
    itemId: "1307286007774961664",
    title: "FEEL GOOD HOODIE",
    variants: [
      { color: "Black", size: "S", variantId: "6ed9264f-3ad9-45c2-875c-09a8d0e05f68", sku: "241116PODRB0722#001" },
      { color: "Black", size: "M", variantId: "23eb7a29-026e-446a-9f9a-218fad6dcf47", sku: "241116PODRB0722#002" },
      { color: "Black", size: "L", variantId: "27b7b8c3-dca8-4ec7-95dc-68a033750186", sku: "241116PODRB0722#003" },
      { color: "Black", size: "XL", variantId: "218f1f01-bdc3-4333-8671-9415c0abb069", sku: "241116PODRB0722#004" },
      { color: "Black", size: "2XL", variantId: "5c2bf0b8-00a5-4e60-a9b7-1594b2fd5ab2", sku: "241116PODRB0722#005" },
    ],
  },
  "ess-hoodie-silentlove": {
    itemId: "1372015227436244992",
    title: "SILENT LOVE HOODIE",
    variants: [
      { color: "Black", size: "S", variantId: "538c7381-496a-43ad-8aa8-f55748477a5e", sku: "241117PODRB0033#001" },
      { color: "Black", size: "M", variantId: "d7ca36d4-8177-4d5b-95f9-7d177c21b954", sku: "241117PODRB0033#002" },
      { color: "Black", size: "L", variantId: "25cef385-2180-41f1-89c5-0efd3a9d7278", sku: "241117PODRB0033#003" },
      { color: "Black", size: "XL", variantId: "2cd18b45-b7fa-4c7c-9e5f-e2be8e187a51", sku: "241117PODRB0033#004" },
      { color: "Black", size: "2XL", variantId: "c73dd8f0-cc47-4c8a-a598-91ee43f56889", sku: "241117PODRB0033#005" },
    ],
  },
  "ess-hoodie-pinkstars": {
    itemId: "1506917437952655360",
    title: "PINK STARS HOODIE",
    variants: [
      { color: "Black", size: "S", variantId: "86fdac85-41c3-4a7f-8a38-c818d27287b3", sku: "260521PODRB2816#001" },
      { color: "Black", size: "M", variantId: "34606109-9937-458c-8102-423a106ceede", sku: "260521PODRB2816#002" },
      { color: "Black", size: "L", variantId: "f14d7f4d-df83-419f-bc72-f85d1c3f61fa", sku: "260521PODRB2816#003" },
      { color: "Black", size: "XL", variantId: "99a7be92-d05c-483f-9d1e-010ef7148c9f", sku: "260521PODRB2816#004" },
      { color: "Black", size: "2XL", variantId: "3c647b8f-b7a5-4f6c-a199-9475181e8c13", sku: "260521PODRB2816#005" },
      { color: "Navy Blue", size: "S", variantId: "69d9e635-dcb9-4402-9fac-70d4ea53bb09", sku: "260521PODRB2816#006" },
      { color: "Navy Blue", size: "M", variantId: "be5b034d-67a2-4208-944e-04e89a7e6a8c", sku: "260521PODRB2816#007" },
      { color: "Navy Blue", size: "L", variantId: "dea79e71-1d86-469a-bd1f-8b4bfbed71b9", sku: "260521PODRB2816#008" },
      { color: "Navy Blue", size: "XL", variantId: "ce6b9c33-8f53-4111-998c-ddfb70f50133", sku: "260521PODRB2816#009" },
      { color: "Navy Blue", size: "2XL", variantId: "93a5a2a3-7b29-4e5e-8850-f6537651e734", sku: "260521PODRB2816#010" },
    ],
  },
  "ess-hoodie-rednolimit": {
    itemId: "1506915281652584448",
    title: "RED NO LIMIT HOODIE",
    variants: [
      { color: "Black", size: "S", variantId: "998b58eb-c8ad-4f07-a7a7-be5e5e8add01", sku: "260521PODRB2699#001" },
      { color: "Black", size: "M", variantId: "27457946-d0d0-4e6a-bbe2-30640cfa0e6a", sku: "260521PODRB2699#002" },
      { color: "Black", size: "L", variantId: "552dfe33-3ec6-42f1-8342-bb89a6322fbd", sku: "260521PODRB2699#003" },
      { color: "Black", size: "XL", variantId: "79e075ff-73fc-4b21-99c4-92b14aefefec", sku: "260521PODRB2699#004" },
      { color: "Black", size: "2XL", variantId: "5467c101-c758-43fd-9ac1-930b03381d68", sku: "260521PODRB2699#005" },
      { color: "Medium Gray", size: "S", variantId: "26e581b0-5dc8-47c1-91f1-92b795686a9b", sku: "260521PODRB2699#006" },
      { color: "Medium Gray", size: "M", variantId: "1d7c9c1c-c9c3-462d-aa0e-4a9c6638ed03", sku: "260521PODRB2699#007" },
      { color: "Medium Gray", size: "L", variantId: "d02aa4e6-e7be-4aeb-879c-45655ed776a5", sku: "260521PODRB2699#008" },
      { color: "Medium Gray", size: "XL", variantId: "1ceb3449-7dca-4915-af0a-c37a0a655343", sku: "260521PODRB2699#009" },
      { color: "Medium Gray", size: "2XL", variantId: "7128c1ac-b677-4555-b153-f9816b85fd0b", sku: "260521PODRB2699#010" },
      { color: "Retro Green", size: "S", variantId: "4593471c-fa4d-46a9-b378-cdc29a48f171", sku: "260521PODRB2699#011" },
      { color: "Retro Green", size: "M", variantId: "14890eb3-7ef8-4860-aa44-71d6eea1d7b6", sku: "260521PODRB2699#012" },
      { color: "Retro Green", size: "L", variantId: "bb15ac9c-194d-4673-bbc0-0c4deb44db49", sku: "260521PODRB2699#013" },
      { color: "Retro Green", size: "XL", variantId: "92f90834-51c2-4e7a-9dff-3aa55b4a5748", sku: "260521PODRB2699#014" },
      { color: "Retro Green", size: "2XL", variantId: "5c8e86a7-3b6c-43d5-9eca-0b6987307854", sku: "260521PODRB2699#015" },
    ],
  },
  "ess-hoodie-bluelane": {
    itemId: "1506914346083717120",
    title: "BLUE CREATE YOUR OWN LANE HOODIE",
    variants: [
      { color: "Black", size: "S", variantId: "7ce4bcc8-ffab-4ec8-b59c-e59a63c97aff", sku: "260521PODRB2669#001" },
      { color: "Black", size: "M", variantId: "5a16668f-b8c0-4166-8df8-073944e4b3ed", sku: "260521PODRB2669#002" },
      { color: "Black", size: "L", variantId: "d3b93879-01e5-4b8a-95a2-c9a9eabf5938", sku: "260521PODRB2669#003" },
      { color: "Black", size: "XL", variantId: "4b84a584-969f-4468-bf22-0b3f812de29d", sku: "260521PODRB2669#004" },
      { color: "Black", size: "2XL", variantId: "3be23ccd-00cd-4385-a08a-3e33f7effb81", sku: "260521PODRB2669#005" },
    ],
  },
  "ess-hoodie-butterfly": {
    itemId: "1303737026855755776",
    title: "BUTTERFLY HOODIE",
    variants: [
      { color: "Black", size: "S", variantId: "5436187b-1a15-474a-9984-ced5ca79cffe", sku: "241106PODRB1114#001" },
      { color: "Black", size: "M", variantId: "615ca8c7-a2a9-404f-b861-fb27e96ef148", sku: "241106PODRB1114#002" },
      { color: "Black", size: "L", variantId: "edcd89e9-5cb9-4a6c-ab79-187a3a06eb39", sku: "241106PODRB1114#003" },
      { color: "Black", size: "XL", variantId: "f4694684-96f0-4fe6-b2c5-7a126e4c57e6", sku: "241106PODRB1114#004" },
      { color: "Black", size: "2XL", variantId: "844a6ba2-e2bc-4620-8309-1f948334bf0e", sku: "241106PODRB1114#005" },
    ],
  },
  "ess-tee-energy": {
    itemId: "1506978335224397824",
    title: "PROTECT YOUR ENERGY TEE",
    variants: [
      { color: "White", size: "S", variantId: "d14fa4ee-4139-47c5-99b3-b35402a6f6a5", sku: "260521PODPQ4262#001" },
      { color: "White", size: "M", variantId: "61030447-bdd2-4d0c-8c92-efe69030fc2b", sku: "260521PODPQ4262#002" },
      { color: "White", size: "L", variantId: "6a521738-3e58-4957-b91b-9d4fddf31cf8", sku: "260521PODPQ4262#003" },
      { color: "White", size: "XL", variantId: "df011587-b7cc-4dd1-a4c7-3d519d534569", sku: "260521PODPQ4262#004" },
      { color: "White", size: "2XL", variantId: "9941537e-b2f8-45b1-8656-92d1b10bd33a", sku: "260521PODPQ4262#005" },
      { color: "White", size: "3XL", variantId: "cd4baf77-62c2-4a8a-867e-4218fbe300ce", sku: "260521PODPQ4262#006" },
    ],
  },
  "ess-tee-execute": {
    itemId: "1506975982836416512",
    title: "EXECUTE TEE",
    variants: [
      { color: "White", size: "S", variantId: "89c56657-df0b-462a-9afc-0227164ccb2a", sku: "260521PODPQ4216#001" },
      { color: "White", size: "M", variantId: "5c3cf328-5ae2-4540-bbf8-57b296af5e94", sku: "260521PODPQ4216#002" },
      { color: "White", size: "L", variantId: "75c0681b-672f-49c3-bfef-faa29f83e060", sku: "260521PODPQ4216#003" },
      { color: "White", size: "XL", variantId: "280b9e3d-c47d-4a4b-89c1-3b18a34e293a", sku: "260521PODPQ4216#004" },
      { color: "White", size: "2XL", variantId: "e6c0b384-ce30-45a7-8c86-61c331306fc6", sku: "260521PODPQ4216#005" },
      { color: "White", size: "3XL", variantId: "5aeb2ae0-bac1-4c3e-9c43-d1e42499b3a3", sku: "260521PODPQ4216#006" },
    ],
  },
  "ess-tee-ambition": {
    itemId: "1506941592693542912",
    title: "AMBITION TEE",
    variants: [
      { color: "Black", size: "S", variantId: "adccef4e-5b9a-4ba1-88bb-2a1163a46c4e", sku: "260521PODPQ3313#001" },
      { color: "Black", size: "M", variantId: "9a8d1e50-32f5-4648-9446-6792cd69785a", sku: "260521PODPQ3313#002" },
      { color: "Black", size: "L", variantId: "e30e93b5-88d7-4ca2-823b-4df532ffb3fb", sku: "260521PODPQ3313#003" },
      { color: "Black", size: "XL", variantId: "2006b1a3-909b-4980-9754-917a94756af4", sku: "260521PODPQ3313#004" },
      { color: "Black", size: "2XL", variantId: "df9b24b1-e4c7-4987-8199-b718ef1bdda7", sku: "260521PODPQ3313#005" },
      { color: "Black", size: "3XL", variantId: "5aa5b05e-2153-477e-b561-a4d4dfcb5743", sku: "260521PODPQ3313#006" },
      { color: "Dark Gray", size: "S", variantId: "e4428a95-471d-48d9-96cb-5afcd1380c70", sku: "260521PODPQ3313#007" },
      { color: "Dark Gray", size: "M", variantId: "02abedf2-26ff-4e31-8685-b1e3f6d39795", sku: "260521PODPQ3313#008" },
      { color: "Dark Gray", size: "L", variantId: "0cce3472-aae4-439e-85cb-37224965e159", sku: "260521PODPQ3313#009" },
      { color: "Dark Gray", size: "XL", variantId: "23012648-58a3-4348-97f7-ae449ab9bb54", sku: "260521PODPQ3313#010" },
      { color: "Dark Gray", size: "2XL", variantId: "e62f9934-5536-4466-b7ce-3a83ea2b5194", sku: "260521PODPQ3313#011" },
      { color: "Dark Gray", size: "3XL", variantId: "2ba928b8-d3f3-4bdc-9774-50c7d2036ce2", sku: "260521PODPQ3313#012" },
      { color: "Navy Blue", size: "S", variantId: "eeadb428-2b65-4d08-8b6a-fbc37c577ec1", sku: "260521PODPQ3313#013" },
      { color: "Navy Blue", size: "M", variantId: "b0ec8a32-e7e6-4216-b4a0-0f642f610133", sku: "260521PODPQ3313#014" },
      { color: "Navy Blue", size: "L", variantId: "ce89ec1a-ae11-4f0c-8c33-7ad18ffddcca", sku: "260521PODPQ3313#015" },
      { color: "Navy Blue", size: "XL", variantId: "4b797318-30b9-499c-a2b2-1d3247e79ebd", sku: "260521PODPQ3313#016" },
      { color: "Navy Blue", size: "2XL", variantId: "6d53b385-bd0d-43a2-9126-213029dbf6c7", sku: "260521PODPQ3313#017" },
      { color: "Navy Blue", size: "3XL", variantId: "8039992d-9c68-4e78-8aed-2c4166ed10ee", sku: "260521PODPQ3313#018" },
    ],
  },
  "ess-tee-money": {
    itemId: "1372015452011761664",
    title: "MONEY MOVES TEE",
    variants: [
      { color: "Light Gray", size: "S", variantId: "e98983a3-97de-4760-bde9-7aec6f9faf14", sku: "241116PODPQ0596#001" },
      { color: "Light Gray", size: "M", variantId: "de1589cf-df89-4594-af4e-688527e919b6", sku: "241116PODPQ0596#002" },
      { color: "Light Gray", size: "L", variantId: "558824de-f8ec-4d71-9f56-56fbd93df954", sku: "241116PODPQ0596#003" },
      { color: "Light Gray", size: "XL", variantId: "470b5e36-e415-43ab-9df5-d42a89e8466a", sku: "241116PODPQ0596#004" },
      { color: "Light Gray", size: "2XL", variantId: "1858f4e0-e8f5-46e9-93bd-4c2f1d38e493", sku: "241116PODPQ0596#005" },
      { color: "Black", size: "S", variantId: "3eb215de-45c4-465e-80bc-418da9e55489", sku: "241116PODPQ0596#011" },
      { color: "Black", size: "M", variantId: "3da67619-5644-4c2b-abc1-85125401fb3d", sku: "241116PODPQ0596#012" },
      { color: "Black", size: "L", variantId: "128c7285-f40f-451f-9463-a2589e5d2766", sku: "241116PODPQ0596#013" },
      { color: "Black", size: "XL", variantId: "39a96672-df50-4b0e-8ccd-1702501d4003", sku: "241116PODPQ0596#014" },
      { color: "Black", size: "2XL", variantId: "66e5c46c-e8bd-4dcd-a9e5-a71a403536b1", sku: "241116PODPQ0596#015" },
    ],
  },
  "ess-tee-true": {
    itemId: "1305868415529046016",
    title: "TRUE SHORT SLEEVE",
    variants: [
      { color: "Black", size: "S", variantId: "4e2ece05-a063-43b0-a887-d39884dfc875", sku: "241112PODPQ1181#001" },
      { color: "Black", size: "M", variantId: "ba047008-2c69-4a51-a681-d8adfa6daee7", sku: "241112PODPQ1181#002" },
      { color: "Black", size: "L", variantId: "f6252f7f-cc52-4665-83dc-141c68441455", sku: "241112PODPQ1181#003" },
      { color: "Black", size: "XL", variantId: "2a1d5e5c-05ef-4a78-a3ef-d4b2a958d8d8", sku: "241112PODPQ1181#004" },
      { color: "Black", size: "2XL", variantId: "57c7c433-8e15-4af0-accd-f5ffcbe27498", sku: "241112PODPQ1181#005" },
    ],
  },
  "ess-tee-romance": {
    itemId: "1305866163867275264",
    title: "ROMANCE SHORT SLEEVES",
    variants: [
      { color: "Black", size: "S", variantId: "0f8ec3ec-2073-4206-92b3-b064bd97751c", sku: "241112PODPQ1172#001" },
      { color: "Black", size: "M", variantId: "7fd34130-62b3-4b6b-ab53-7cbfef76280e", sku: "241112PODPQ1172#002" },
      { color: "Black", size: "L", variantId: "074b176d-56b7-443c-a29a-7b7029daba3f", sku: "241112PODPQ1172#003" },
      { color: "Black", size: "XL", variantId: "a648086f-dec1-4a97-861a-9f2ef6ec0f2b", sku: "241112PODPQ1172#004" },
      { color: "Black", size: "2XL", variantId: "3e1e46cf-9008-4aad-916c-403a25e13443", sku: "241112PODPQ1172#005" },
    ],
  },
  "ess-tee-moneyangle": {
    itemId: "1304297149722447872",
    title: "MONEY ANGLE TEE",
    variants: [
      { color: "Black", size: "S", variantId: "d929b08a-d7b4-4833-8a25-9e471b3fe87d", sku: "241108PODPQ0294#001" },
      { color: "Black", size: "M", variantId: "db2868e3-a092-48b9-a716-82f003c62f94", sku: "241108PODPQ0294#002" },
      { color: "Black", size: "L", variantId: "541a1bfa-986a-4481-8a5b-1ed2705d0da5", sku: "241108PODPQ0294#003" },
      { color: "Black", size: "XL", variantId: "643a77cd-1e6d-4b33-88b5-cf317b8409e9", sku: "241108PODPQ0294#004" },
      { color: "Black", size: "2XL", variantId: "5d3e43de-88b0-4f0a-bf29-6455ccc5ebae", sku: "241108PODPQ0294#005" },
    ],
  },
  "ess-tee-artwar195cash": {
    itemId: "1303961613644259328",
    title: "ART WAR $1.95 CASH TEE",
    variants: [
      { color: "Black", size: "S", variantId: "e520e55f-c36f-425b-97f6-ae8e83a8464f", sku: "241107PODPQ0395#001" },
      { color: "Black", size: "M", variantId: "03d3bc59-313a-464b-adb6-6771b1f9f1bd", sku: "241107PODPQ0395#002" },
      { color: "Black", size: "L", variantId: "5dd8b6e5-1156-46f2-8666-213602f1a7d9", sku: "241107PODPQ0395#003" },
      { color: "Black", size: "XL", variantId: "0426bcef-20a4-4e45-a42d-11728d9e7440", sku: "241107PODPQ0395#004" },
      { color: "Black", size: "2XL", variantId: "77d0b57b-f1e0-47c8-a6a0-b6975c0c4104", sku: "241107PODPQ0395#005" },
    ],
  },
  "ess-tee-powerofmoney": {
    itemId: "1313674517184462848",
    title: "POWER OF MONEY TEE",
    variants: [
      { color: "Black", size: "S", variantId: "c54b2933-b0ce-40ce-8994-5f6ab9e05e55", sku: "241204PODPQ0104#001" },
      { color: "Black", size: "M", variantId: "9a277644-4095-4e6b-98a3-f7a54284da50", sku: "241204PODPQ0104#002" },
      { color: "Black", size: "L", variantId: "9b7f1078-57dc-4b85-8268-5ac416b77aa0", sku: "241204PODPQ0104#003" },
      { color: "Black", size: "XL", variantId: "f508c1d1-9f1f-4712-a213-c67617aa2ae6", sku: "241204PODPQ0104#004" },
      { color: "Black", size: "2XL", variantId: "d6ad894f-edf2-46e4-b614-7eb182f066fd", sku: "241204PODPQ0104#005" },
    ],
  },
  "ess-tee-hustlerangle": {
    itemId: "1313658389464825856",
    title: "HUSTLER ANGLE TEE",
    variants: [
      { color: "Black", size: "S", variantId: "61ce8afe-6adb-4217-82b5-5524ce53134d", sku: "241204PODPQ0013#001" },
      { color: "Black", size: "M", variantId: "e91c518c-f1c4-471c-bbfd-9c3f0fe506c2", sku: "241204PODPQ0013#002" },
      { color: "Black", size: "L", variantId: "b4995383-8dca-484a-a6d0-9976a103f806", sku: "241204PODPQ0013#003" },
      { color: "Black", size: "XL", variantId: "1de948bb-ffed-4900-8e98-8e3e5886348c", sku: "241204PODPQ0013#004" },
      { color: "Black", size: "2XL", variantId: "843aff75-0f64-4833-a2ca-bfd2b8208c87", sku: "241204PODPQ0013#005" },
      { color: "Light Gray", size: "S", variantId: "c8e4240b-be70-4851-8946-d970b65125ef", sku: "241204PODPQ0013#006" },
      { color: "Light Gray", size: "M", variantId: "03ea813d-a2b3-4352-a77a-dcb71a648d17", sku: "241204PODPQ0013#007" },
      { color: "Light Gray", size: "L", variantId: "bb3a66bd-17e6-40d4-9a2a-f69f75cfec72", sku: "241204PODPQ0013#008" },
      { color: "Light Gray", size: "XL", variantId: "e10cdbbc-8d3d-483c-9e8f-86cd269062c0", sku: "241204PODPQ0013#009" },
      { color: "Light Gray", size: "2XL", variantId: "2ff589fa-b9e8-434e-a637-43e1eb773872", sku: "241204PODPQ0013#010" },
    ],
  },
  "ess-tee-nolimits": {
    itemId: "1506924167184945152",
    title: "CASH CULTURE NO LIMITS",
    variants: [
      { color: "Black", size: "S", variantId: "b9507d13-3f90-4bbc-a1fd-b6ca2b1463aa", sku: "260521PODPQ2973#001" },
      { color: "Black", size: "M", variantId: "628fa9da-f3b2-4e29-b1fa-f2d2311d3d74", sku: "260521PODPQ2973#002" },
      { color: "Black", size: "L", variantId: "d32bfbf5-e092-49dd-b870-5f51e45c2ea5", sku: "260521PODPQ2973#003" },
      { color: "Black", size: "XL", variantId: "6e3a7e7d-c9f1-4c8e-b7f7-0536a9e1cd55", sku: "260521PODPQ2973#004" },
      { color: "Black", size: "2XL", variantId: "3c2c3d83-f657-49b4-b832-9d051e887859", sku: "260521PODPQ2973#005" },
      { color: "Black", size: "3XL", variantId: "52bd9a2d-897c-4723-9d24-5cb3fedfb9de", sku: "260521PODPQ2973#006" },
    ],
  },
  "ess-tee-teddy": {
    itemId: "1472207156060348416",
    title: "CASH CULTURE TEDDY",
    variants: [
      { color: "Black", size: "S", variantId: "9bd9f308-61b0-47bb-a69d-fe4a68f56bdd", sku: "260214PODAA2920#001" },
      { color: "Black", size: "M", variantId: "c505be17-ceda-4924-b538-e66911fd403d", sku: "260214PODAA2920#002" },
      { color: "Black", size: "L", variantId: "54d3a1ad-fee9-4322-8f39-389caf794c86", sku: "260214PODAA2920#003" },
    ],
  },
  "ess-tee-shortsleeve": {
    itemId: "1391380547770662912",
    title: "CASH CULTURE SHORT SLEEVE TEE",
    variants: [
      { color: "White", size: "XS", variantId: "44a0d3fc-5e2e-4c4d-b3d4-435e4ff423d4", sku: "250706PODPQ1015#001" },
      { color: "White", size: "S", variantId: "0111fc72-c0b5-466b-a7ed-996f2f56c2b2", sku: "250706PODPQ1015#002" },
      { color: "White", size: "M", variantId: "61cd86b7-3375-4c4b-a11b-2d0d24e63ac9", sku: "250706PODPQ1015#003" },
      { color: "White", size: "L", variantId: "352674a8-a336-4f8a-878a-683ed3de6f23", sku: "250706PODPQ1015#004" },
      { color: "White", size: "XL", variantId: "ef7fb0cd-e7d8-40cc-80d1-c8f0da43c757", sku: "250706PODPQ1015#005" },
      { color: "White", size: "2XL", variantId: "2af31858-26a5-4ecd-a3eb-3e776fdc38cf", sku: "250706PODPQ1015#006" },
      { color: "Flower Gray", size: "XS", variantId: "02c4d5f5-e11f-45c5-961b-69529d72a6c8", sku: "250706PODPQ1015#007" },
      { color: "Flower Gray", size: "S", variantId: "0360e51d-b40e-4915-bbbf-bd67b8bd4a04", sku: "250706PODPQ1015#008" },
      { color: "Flower Gray", size: "M", variantId: "04839d32-f296-4541-a260-148befac48a7", sku: "250706PODPQ1015#009" },
      { color: "Flower Gray", size: "L", variantId: "ad7727d3-f941-42bd-aa49-5c438f93bd23", sku: "250706PODPQ1015#010" },
      { color: "Flower Gray", size: "XL", variantId: "8e5dc254-6f3a-4f00-a027-b1fab79e6e9a", sku: "250706PODPQ1015#011" },
      { color: "Flower Gray", size: "2XL", variantId: "1bfc94ca-c3c7-4f27-902e-1c4564b4b278", sku: "250706PODPQ1015#012" },
    ],
  },
  "ess-tee-soccerjersey": {
    itemId: "1506935358229741568",
    title: "CASH CULTURE SOCCER JERESY",
    variants: [
      { color: "Black", size: "M", variantId: "f863baaf-f073-4dd6-b18b-1781565100ba", sku: "260521PODPQ3182#001" },
      { color: "Black", size: "L", variantId: "48364a26-55bc-4ca4-998d-20670b33b109", sku: "260521PODPQ3182#002" },
      { color: "Black", size: "XL", variantId: "08a047d3-62f4-4013-bfe7-5af5a0629dae", sku: "260521PODPQ3182#003" },
      { color: "Black", size: "2XL", variantId: "7357fff5-1738-4b16-b11b-058b582964d8", sku: "260521PODPQ3182#004" },
      { color: "Dark Green with Black", size: "M", variantId: "88d61c47-1ae6-4109-b3b9-9caea7fb47ad", sku: "260521PODPQ3182#009" },
      { color: "Dark Green with Black", size: "L", variantId: "32827830-0043-40d4-a462-b37f1282e455", sku: "260521PODPQ3182#010" },
      { color: "Dark Green with Black", size: "XL", variantId: "d3eea428-f4a5-4a24-9b6c-275a2d98b1f0", sku: "260521PODPQ3182#011" },
      { color: "Dark Green with Black", size: "2XL", variantId: "2f829b8f-abed-4c38-ba2a-a6a65cb5f5ff", sku: "260521PODPQ3182#012" },
      { color: "Navy Blue with Gray Blue", size: "M", variantId: "c971406d-af12-46ba-87ae-1c2f9b1b878c", sku: "260521PODPQ3182#013" },
      { color: "Navy Blue with Gray Blue", size: "L", variantId: "5b0e8f91-eff7-4455-b610-d57a0acdefd5", sku: "260521PODPQ3182#014" },
      { color: "Navy Blue with Gray Blue", size: "XL", variantId: "8e8143d2-9abd-4217-aca4-6db74d514b76", sku: "260521PODPQ3182#015" },
      { color: "Navy Blue with Gray Blue", size: "2XL", variantId: "c1b1d4ce-4860-4cc9-8418-f1aedde87c1e", sku: "260521PODPQ3182#016" },
    ],
  },
  "ess-tee-sza": {
    itemId: "1303735565543452672",
    title: "SZA TEA",
    variants: [
      { color: "Black", size: "S", variantId: "09b15d7d-06fd-460f-ac79-07b1272e9195", sku: "241106PODPQ1110#001" },
      { color: "Black", size: "M", variantId: "53ab87ad-bf90-49cd-95eb-38277f4aad85", sku: "241106PODPQ1110#002" },
      { color: "Black", size: "L", variantId: "83c860ec-5ac6-4780-97b0-5661a081da3f", sku: "241106PODPQ1110#003" },
      { color: "Black", size: "XL", variantId: "900fd393-0c43-4a10-8f2a-e2699f5bfeb5", sku: "241106PODPQ1110#004" },
      { color: "Black", size: "2XL", variantId: "7adc1d2f-5384-45a1-9fdc-e15db07a1ee3", sku: "241106PODPQ1110#005" },
    ],
  },
  "ess-tee-worldwide": {
    itemId: "1506854161306779648",
    title: "ORANGE WORLDWIDE TEE",
    variants: [
      { color: "Black", size: "S", variantId: "fc7424c4-489b-4fa0-9581-56f28be876a8", sku: "260521PODPQ1095#001" },
      { color: "Black", size: "M", variantId: "44f8c617-2103-4692-8066-213c9824d08b", sku: "260521PODPQ1095#002" },
      { color: "Black", size: "L", variantId: "f8811b3b-b4d8-4be4-8fbe-2bac115dd718", sku: "260521PODPQ1095#003" },
      { color: "Black", size: "XL", variantId: "2d109975-65c7-4211-b660-ff7b3e9f851c", sku: "260521PODPQ1095#004" },
      { color: "Black", size: "2XL", variantId: "7bce5870-89c2-4783-bb38-b3e0220aefb6", sku: "260521PODPQ1095#005" },
      { color: "Black", size: "3XL", variantId: "985e8076-a852-447e-818b-6df48a3a9d82", sku: "260521PODPQ1095#006" },
      { color: "Navy Blue", size: "S", variantId: "ba6e07fc-2cfe-4774-9b92-cac9829a94f4", sku: "260521PODPQ1095#007" },
      { color: "Navy Blue", size: "M", variantId: "1cdaa0f3-50ec-495f-b1b6-93cb03755d8e", sku: "260521PODPQ1095#008" },
      { color: "Navy Blue", size: "L", variantId: "0c3fd4ec-1a7c-4b4d-9975-ffbc695a8b6e", sku: "260521PODPQ1095#009" },
      { color: "Navy Blue", size: "XL", variantId: "788ef220-53ed-452a-8b88-a50686e611ea", sku: "260521PODPQ1095#010" },
      { color: "Navy Blue", size: "2XL", variantId: "fd8c2d54-0626-473b-971b-850e71e17fd7", sku: "260521PODPQ1095#011" },
      { color: "Navy Blue", size: "3XL", variantId: "04315d65-499d-4492-8fa2-94ad3ff7fd93", sku: "260521PODPQ1095#012" },
      { color: "Coffee", size: "S", variantId: "865490c0-a6cd-4fc3-b357-03f504a82696", sku: "260521PODPQ1095#013" },
      { color: "Coffee", size: "M", variantId: "fcffe8da-6d46-45b8-9bae-afd47249dbb3", sku: "260521PODPQ1095#014" },
      { color: "Coffee", size: "L", variantId: "2c2b780a-2903-46b2-a5b9-069eea159ae1", sku: "260521PODPQ1095#015" },
      { color: "Coffee", size: "XL", variantId: "71e8b0cf-de24-4777-88cb-8ab168bcb4ed", sku: "260521PODPQ1095#016" },
      { color: "Coffee", size: "2XL", variantId: "0a619034-8e10-4d14-8113-8d5b40b7cd18", sku: "260521PODPQ1095#017" },
      { color: "Coffee", size: "3XL", variantId: "d0beb67c-0460-45a7-8b56-6c3be15e1bb8", sku: "260521PODPQ1095#018" },
      { color: "White Gray", size: "S", variantId: "7155736a-2182-4674-b30b-97e0c2383ab1", sku: "260521PODPQ1095#019" },
      { color: "White Gray", size: "M", variantId: "3655df82-e4e4-4c8a-a8ca-7cd9599a2a2a", sku: "260521PODPQ1095#020" },
      { color: "White Gray", size: "L", variantId: "c444a07e-e3b1-4bc2-be4c-15cd7abdc1ff", sku: "260521PODPQ1095#021" },
      { color: "White Gray", size: "XL", variantId: "9aff6dd9-956f-42a0-a933-879c971f2164", sku: "260521PODPQ1095#022" },
      { color: "White Gray", size: "2XL", variantId: "6881a1eb-c0af-495c-9fe1-cb5d41c20cf9", sku: "260521PODPQ1095#023" },
      { color: "White Gray", size: "3XL", variantId: "3814bbca-5c48-4f85-b8d3-e4af78e1a49d", sku: "260521PODPQ1095#024" },
    ],
  },
  "ess-ls-hope": {
    itemId: "1472207815660789760",
    title: "HOPE LONG SLEEVE",
    variants: [
      { color: "Black", size: "S", variantId: "84460239-be0a-436b-b771-5c3491ed1e47", sku: "260214PODRA2937#001" },
      { color: "Black", size: "M", variantId: "a2370ed6-8662-49bf-a005-04e1062b37f1", sku: "260214PODRA2937#002" },
      { color: "Black", size: "L", variantId: "499d933c-0ad1-427a-9e90-0f8a910ae4db", sku: "260214PODRA2937#003" },
      { color: "Black", size: "XL", variantId: "fa84ab79-8f8e-4a62-bf38-f1017955fc60", sku: "260214PODRA2937#004" },
      { color: "Black", size: "2XL", variantId: "5823573c-94f4-40c0-ae18-bbf2ae0835da", sku: "260214PODRA2937#005" },
    ],
  },
  "ess-shorts-samuraiblack": {
    itemId: "1372014230685065216",
    title: "BLACK LOST SAMURAI SHORTS",
    variants: [
      { color: "Black", size: "XS", variantId: "69445bfa-2722-439d-afca-ed0969cbc3ef", sku: "250514PODFV0098#001" },
      { color: "Black", size: "S", variantId: "b74e32d8-7d26-4bfb-b36f-9733e72eed84", sku: "250514PODFV0098#002" },
      { color: "Black", size: "M", variantId: "73df04fc-ba8d-4fd1-8d62-912bef002733", sku: "250514PODFV0098#003" },
      { color: "Black", size: "L", variantId: "a908f2ad-0710-46f4-b8e0-442b353fe0d6", sku: "250514PODFV0098#004" },
      { color: "Black", size: "XL", variantId: "99d072ca-1146-496a-959e-c97f9db235e5", sku: "250514PODFV0098#005" },
      { color: "Black", size: "2XL", variantId: "fe5325f9-02cc-4f5f-b06a-a506180bb842", sku: "250514PODFV0098#006" },
    ],
  },
  "ess-shorts-samuraiwhite": {
    itemId: "1372012834363514880",
    title: "WHITE LOST SAMURAI SHORTS",
    variants: [
      { color: "White", size: "XS", variantId: "4ed4ea5a-3782-4b93-8bb8-2ee025ebfc39", sku: "250514PODFV0089#001" },
      { color: "White", size: "S", variantId: "35e8c3f9-ccab-4ae5-b5b4-c961a88d05f9", sku: "250514PODFV0089#002" },
      { color: "White", size: "M", variantId: "c7e0c99d-a90f-4f99-9b15-aaee2431957e", sku: "250514PODFV0089#003" },
      { color: "White", size: "L", variantId: "3366d68f-201a-4276-a5e6-e21d6cfce447", sku: "250514PODFV0089#004" },
      { color: "White", size: "XL", variantId: "00233dca-d707-4bd6-abda-cabc56947d1b", sku: "250514PODFV0089#005" },
      { color: "White", size: "2XL", variantId: "6895a647-2f9a-4420-bb8b-cb6bcbb76e1f", sku: "250514PODFV0089#006" },
      { color: "Oat Gray", size: "XS", variantId: "37b4dd85-c92a-41d2-9bdc-e6f9fde6d315", sku: "250514PODFV0089#007" },
      { color: "Oat Gray", size: "S", variantId: "41a023de-9241-424b-aa99-30deb252f988", sku: "250514PODFV0089#008" },
      { color: "Oat Gray", size: "M", variantId: "958cab9e-4483-40a8-bdf6-93b2a67acb78", sku: "250514PODFV0089#009" },
      { color: "Oat Gray", size: "L", variantId: "642af8c8-e2b5-4e23-a5ca-8b697acb6667", sku: "250514PODFV0089#010" },
      { color: "Oat Gray", size: "XL", variantId: "da78a3c3-b076-470f-868b-0e47ac52c612", sku: "250514PODFV0089#011" },
      { color: "Oat Gray", size: "2XL", variantId: "4a7ed6b0-13de-4447-8111-adb7dbafa1f6", sku: "250514PODFV0089#012" },
    ],
  },
  "ess-joggers-silentlove": {
    itemId: "1331226626855469056",
    title: "SILENT LOVE JOGGERS",
    variants: [
      { color: "Black", size: "S", variantId: "779282f7-080f-4993-93b7-9d010de97268", sku: "250121PODPX0870#001" },
      { color: "Black", size: "M", variantId: "d6cfa3a6-3acf-4890-8a79-fba345bc73b8", sku: "250121PODPX0870#002" },
      { color: "Black", size: "L", variantId: "eaf80cca-c923-4ec6-bfec-ebe790287145", sku: "250121PODPX0870#003" },
      { color: "Black", size: "XL", variantId: "cdd1dbf3-6063-46e6-b989-2d3efb87aad8", sku: "250121PODPX0870#004" },
      { color: "Black", size: "2XL", variantId: "50d801a6-44ec-4488-97dd-ce94fdb46031", sku: "250121PODPX0870#005" },
    ],
  },
  "ess-tank-silentlove": {
    itemId: "1353910575628959744",
    title: "SILET LOVE TANK TOP",
    variants: [
      { color: "Black", size: "S", variantId: "2e68c8ad-ef8b-4cba-82b5-d6633f6811df", sku: "250325PODPT0154#001" },
      { color: "Black", size: "M", variantId: "258b65c7-bc9f-41e0-8436-ce7ad60134f3", sku: "250325PODPT0154#002" },
      { color: "Black", size: "L", variantId: "56936a3f-0b35-4470-862b-b8d82b602eb8", sku: "250325PODPT0154#003" },
      { color: "Black", size: "XL", variantId: "3d505ec5-8551-4093-8a10-d5f29467a3c0", sku: "250325PODPT0154#004" },
      { color: "Black", size: "2XL", variantId: "979d6ce5-1d32-413c-8fd2-1b7c578354b8", sku: "250325PODPT0154#005" },
    ],
  },
  "ess-tank-samuraihoodie": {
    itemId: "1372011732410802176",
    title: "LOST SAMURAI TANK TOP HOODIE",
    variants: [
      { color: "Black", size: "S", variantId: "009563b9-aceb-4440-94e7-db7bf0cef7b1", sku: "250514PODPT0085#001" },
      { color: "Black", size: "M", variantId: "8a57d216-95b9-4b9e-8604-e5bc0985e8e3", sku: "250514PODPT0085#002" },
      { color: "Black", size: "L", variantId: "d41b4aba-22c6-4dd5-970f-225caafd2962", sku: "250514PODPT0085#003" },
      { color: "Black", size: "XL", variantId: "7bba251b-904b-4127-8538-3c60df0024df", sku: "250514PODPT0085#004" },
      { color: "Black", size: "2XL", variantId: "b9885b36-9e3f-4753-ae2d-c2aeefdeaa4f", sku: "250514PODPT0085#005" },
    ],
  },
};

const SIZE_SET = new Set(["XS","S","M","L","XL","2XL","3XL","4XL","5XL"]);
void SIZE_SET;
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Resolve a single Tapstitch variant for a storefront product + chosen
 * size/color. Size is matched exactly (normalized); color is matched
 * fuzzily (either contains the other) since storefront and Tapstitch color
 * names can differ (e.g. "Washed Blue" vs "Navy Blue").
 */
export function resolveTapstitchVariant(
  productId: string,
  opts: { size?: string; color?: string } = {},
): TapstitchVariant | undefined {
  const product = TAPSTITCH_BY_PRODUCT[productId];
  if (!product) return undefined;
  let vs = product.variants;
  if (opts.size) {
    const ns = norm(opts.size);
    const bySize = vs.filter((v) => v.size && norm(v.size) === ns);
    if (bySize.length) vs = bySize;
  }
  if (opts.color && vs.length > 1) {
    const nc = norm(opts.color);
    const byColor = vs.filter(
      (v) => v.color && (norm(v.color).includes(nc) || nc.includes(norm(v.color))),
    );
    if (byColor.length) vs = byColor;
  }
  return vs[0];
}
