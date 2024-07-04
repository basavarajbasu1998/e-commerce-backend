function generateProductId(productId) {
    const timestamp = Date.now();
    return `${productId}_${timestamp}`
}
export default generateProductId;