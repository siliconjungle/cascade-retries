const cascadeRetries = async (fn, retryCount, delay, backoff = 1) => {
  try {
    return await fn()
  } catch (error) {
    if (retryCount <= 0) {
      throw error
    }
    await new Promise(resolve => setTimeout(resolve, delay))
    const nextDelay = delay * backoff
    return cascadeRetries(fn, retryCount - 1, nextDelay, backoff)
  }
}
