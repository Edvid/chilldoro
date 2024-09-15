export let isMuted: boolean = true;

export function play(filename: string) {
  if(typeof document === 'undefined') {
    throw new Error('This function should only be called on the client.');
  }
  var audio = new Audio(filename);
  document.body.appendChild(audio);
  audio.muted = isMuted
  audio.play();
  setTimeout(() => {
    audio.remove();
  }, 10000);
}

export function mute (state?: boolean) {
  if(typeof document === 'undefined') {
    throw new Error('This function should only be called on the client.');
  }
  let newState: boolean;
  if (state === null || typeof state === 'undefined') {
    newState = !isMuted;
  } else {
    newState = state;
  }
  isMuted = newState;
  document.querySelectorAll<HTMLAudioElement>("audio").forEach((el) => {
    el.muted = newState;
  })
  console.log("mute: " + isMuted);
}
