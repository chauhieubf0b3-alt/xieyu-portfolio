globalThis.PortfolioLogic = {
  clampPosition(x, y, width, height, itemWidth, itemHeight, padding = 8) {
    const limitX = Math.max(0, width - itemWidth - padding);
    const limitY = Math.max(0, height - itemHeight - padding);
    const minX = Math.min(padding, limitX);
    const minY = Math.min(padding, limitY);
    return {x:Math.min(limitX,Math.max(minX,Number.isFinite(x)?x:minX)),y:Math.min(limitY,Math.max(minY,Number.isFinite(y)?y:minY))};
  },
  decodePositions(raw, allowedKeys) {
    const result = Object.create(null);
    try {
      const value = JSON.parse(raw);
      if (!value || typeof value !== 'object' || Array.isArray(value)) return result;
      for (const key of allowedKeys) {
        if (!Object.hasOwn(value,key)) continue;
        const position = value[key];
        if (position && Number.isFinite(position.x) && Number.isFinite(position.y) && position.x >= -2 && position.x <= 3 && position.y >= -2 && position.y <= 3) result[key] = {x:position.x,y:position.y};
      }
    } catch { /* Invalid saved positions fall back to the initial layout. */ }
    return result;
  },
};
