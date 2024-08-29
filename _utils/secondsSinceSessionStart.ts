export default function secondsSinceSessionStart (then: Date, now: Date) {
  return Math.floor((now.getTime() - then.getTime()) / 1000)
}
