function getIsoDateWithTimezone(timestamp) {
  const tzOffset = new Date().getTimezoneOffset() * 60000
  return new Date(timestamp - tzOffset).toISOString().slice(0, -1)
}

function getTimestampWithTimezone(timestamp) {
  const tzOffset = new Date().getTimezoneOffset() * 60000
  return new Date(timestamp - tzOffset).getTime()
}

const Helper = {
  getIsoDateWithTimezone,
  getTimestampWithTimezone,
}

export default Helper
