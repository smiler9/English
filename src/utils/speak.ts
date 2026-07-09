import * as Speech from 'expo-speech';

/** 영어 단어/문장을 소리로 읽어준다. voca 앱과 동일한 설정이다. */
export function speak(text: string) {
  Speech.stop();
  Speech.speak(text, { language: 'en-US', rate: 0.92 });
}
