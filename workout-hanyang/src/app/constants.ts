// app/constants.ts
export const BODY_PARTS = {
    CHEST: '가슴',
    BACK: '등',
    SHOULDERS: '어깨',
    LEGS: '하체',
    ARMS: '팔',
    ABS: '복근'
  } as const;
  
  export type BodyPart = typeof BODY_PARTS[keyof typeof BODY_PARTS];
  
  export const EXERCISES = {
    [BODY_PARTS.CHEST]: ['벤치프레스', '푸시업', '덤벨 플라이', '한양대 특별 푸시업'],
    [BODY_PARTS.BACK]: ['턱걸이', '데드리프트', '로우', '한양대 특별 로잉'],
    [BODY_PARTS.SHOULDERS]: ['오버헤드 프레스', '사이드 레터럴 레이즈', '프론트 레이즈', '한양대 특별 숄더 프레스'],
    [BODY_PARTS.LEGS]: ['스쿼트', '레그 프레스', '런지', '한양대 특별 점프 스쿼트'],
    [BODY_PARTS.ARMS]: ['바이셉 컬', '트라이셉 익스텐션', '해머 컬', '한양대 특별 암 워크아웃'],
    [BODY_PARTS.ABS]: ['크런치', '플랭크', '레그 레이즈', '한양대 특별 코어 운동']
  } as const;
  
  export const HANYANG_LOCATIONS = [
    '학생체육관',
    '올림픽체육관',
    '실내체육관',
    '야외 운동장',
    '한양대 헬스장'
  ] as const;
  
  export interface WorkoutData {
    id?: number;
    bodyPart: BodyPart | null;
    exercise: string;
    sets: number;
    reps: number;
    weight: number;
    location: string;
    volume: number;
  }
  