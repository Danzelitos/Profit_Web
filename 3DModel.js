const mv = document.getElementById('diamond');

  mv.addEventListener('load', () => {
    // если в модели один материал:
    const mats = mv.model?.materials || [];
    for (const m of mats) {
      // 1) фиолетовый оттенок
      m.pbrMetallicRoughness.setBaseColorFactor?.([0.9, 0.1, 0.6, 1.0]); // RGBA 0..1
      // 2) эмиссия (свечение)
      // базовая поддержка
      m.emissiveFactor = [0.45, 0.33, 1.0];
      // если доступно расширение emissive strength — усиливаем
      if ('emissiveStrength' in m) m.emissiveStrength = 2.2;
      // иногда помогает сделать материал чуть менее rough для “мокрого блеска”
      m.pbrMetallicRoughness.roughnessFactor = 0.2;
      m.pbrMetallicRoughness.metallicFactor  = 0.6;
    }
  });