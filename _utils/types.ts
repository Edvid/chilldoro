export type PomodoroType = {
  active: number,
  break: number
}

export const PomodoroTypes: Record<string, PomodoroType> = {
  burst: { active: 20, break: 5},
  normal: { active: 25, break: 5},
  double: { active: 50, break: 10}
}

export type TimeInfo = {
  sessionStartTime: Date,
  currentTime: Date,
  rawSecondsSinceStartTime: number,
  paused: number,
  secondsSinceStartTime: number,
  pomodoroType: PomodoroType
  totalRatio: number
}
