import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Test from '~/components/Test.vue';
import { onMounted, ref } from 'vue';

// it('can mount some component', async () => {
//   const component = mount(Test, {
//     props: {
//       title: 'Hello world',
//       date: '2022-12-31T23:59:59',
//     },
//   });

//   expect(component.find('h3').text()).toBe('Hello world');
// });

describe('Test', () => {
  let wrapper: any;
  const title = 'Test Title';
  const date = '2024-04-25T23:59:59';

  beforeEach(() => {
    wrapper = mount(Test, {
      props: {
        title,
        date,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the title correctly', () => {
    expect(wrapper.find('h3').text()).toBe(title);
  });

  it('updates the timer output correctly', async () => {
    const dayOutput = wrapper.find('.day');
    const hourOutput = wrapper.find('.hour');
    const minuteOutput = wrapper.find('.minute');
    const secondOutput = wrapper.find('.second');

    const timerOutput = ref({
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    });

    const startTimer = () => {
      const timeNow = new Date().getTime();
      const timeDifference = new Date(date).getTime() - timeNow;
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
      startTimer();
      setInterval(() => {
        startTimer();
      }, 1000);
    });

    expect(dayOutput.text()).contains(timerOutput.value.day);
    expect(hourOutput.text()).contains(timerOutput.value.hour);
    expect(minuteOutput.text()).contains(timerOutput.value.minute);
    expect(secondOutput.text()).contains(timerOutput.value.second);
  });
});
