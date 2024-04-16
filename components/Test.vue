<template>
  <div class="sm:px-4 lg:px-8">
    <h3 class="title-5 text-center text-cod-gray-50">{{ props.title }}</h3>

    <div class="mt-3 bg-gray-custom-100/70 p-2">
      <!-- time countdown -->
      <div
        class="title-1 flex justify-between items-center space-x-2 font-raleway font-semibold"
      >
        <span class="day w-16 text-center">
          {{
            timerOutput.day > 0
              ? `${timerOutput.day > 9 ? '' : '0'}${timerOutput.day}`
              : '00'
          }}
        </span>
        <span>:</span>

        <span class="hour w-16 text-center">
          {{
            timerOutput.hour > 0
              ? `${timerOutput.hour > 9 ? '' : '0'}${timerOutput.hour}`
              : '00'
          }}
        </span>
        <span>:</span>

        <span class="minute w-16 text-center">
          {{
            timerOutput.minute > 0
              ? `${timerOutput.minute > 9 ? '' : '0'}${timerOutput.minute}`
              : '00'
          }}
        </span>
        <span>:</span>

        <span class="second w-16 text-center">
          {{
            timerOutput.second > 0
              ? `${timerOutput.second > 9 ? '' : '0'}${timerOutput.second}`
              : '00'
          }}
        </span>
      </div>

      <!-- time labels -->
      <div
        class="mt-2 title-1 flex justify-between items-center space-x-2 font-bold"
      >
        <span class="text-xs text-center w-full"> Days </span>
        <span class="text-xs text-center w-full"> Hours </span>
        <span class="text-xs text-center w-full"> Minutes </span>
        <span class="text-xs text-center w-full"> Seconds </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
});

const timerOutput = ref({
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
});

const startTimer = () => {
  const timeNow = new Date().getTime();
  const timeDifference = new Date(props.date).getTime() - timeNow;
  const millisecondsInOneSecond = 1000;
  const millisecondsInOneMinute = millisecondsInOneSecond * 60;
  const millisecondsInOneHour = millisecondsInOneMinute * 60;
  const millisecondsInOneDay = millisecondsInOneHour * 24;
  const differenceInDays = timeDifference / millisecondsInOneDay;
  const remainderDifferenceInHours =
    (timeDifference % millisecondsInOneDay) / millisecondsInOneHour;
  const remainderDifferenceInMinutes =
    (timeDifference % millisecondsInOneHour) / millisecondsInOneMinute;
  const remainderDifferenceInSeconds =
    (timeDifference % millisecondsInOneMinute) / millisecondsInOneSecond;
  const remainingDays = Math.floor(differenceInDays);
  const remainingHours = Math.floor(remainderDifferenceInHours);
  const remainingMinutes = Math.floor(remainderDifferenceInMinutes);
  const remainingSeconds = Math.floor(remainderDifferenceInSeconds);

  timerOutput.value.day = remainingDays;
  timerOutput.value.hour = remainingHours;
  timerOutput.value.minute = remainingMinutes;
  timerOutput.value.second = remainingSeconds;
};

onMounted(() => {
  setInterval(() => {
    startTimer();
  }, 1000);
});
</script>

<style scoped></style>
