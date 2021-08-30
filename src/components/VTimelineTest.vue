<template>
  <v-container fluid>
    <v-card class="mx-auto">
      <v-card-title class="secondary white--text">
        <span class="text-h6">Logs</span>
        <v-spacer></v-spacer>
        <v-btn
          :outlined="interval == null"
          :color="interval == null ? 'white' : 'basil'"
          @click="interval == null ? start() : stop()"
          dark
        >
          Realtime Logging
        </v-btn>
      </v-card-title>
      <v-card-text class="py-0">
        <v-timeline dense>
          <v-slide-x-reverse-transition group hide-on-leave>
            <v-timeline-item
              v-for="item in items"
              :key="item.id"
              :color="item.color"
              fill-dot
              small
            >
              <v-alert :value="true" :color="item.color" :icon="item.icon" dark>
                {{ item.text }}
              </v-alert>
            </v-timeline-item>
          </v-slide-x-reverse-transition>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment';

const COLORS = ['error', 'success'];
const ICONS = {
  error: 'mdi-alert',
  success: 'mdi-check-circle'
};

export default {
  data: () => ({
    interval: null,
    items: [
      {
        id: 1,
        color: 'success',
        icon: ICONS.success,
        text: moment().format('YYYY/MM/DD HH:mm:ss')
      }
    ],
    id: 2
  }),

  beforeDestroy() {
    this.stop();
  },

  methods: {
    start() {
      this.interval = setInterval(this.addLog, 3000);
    },
    stop() {
      clearInterval(this.interval);
      this.interval = null;
    },
    addLog() {
      let { color, icon } = this.genLog();

      const previousColor = this.items[0].color;

      while (previousColor === color) {
        color = this.genColor();
        icon = this.genIcon(color);
      }

      this.items.unshift({
        id: this.id++,
        color,
        icon,
        text: moment().format('YYYY/MM/DD HH:mm:ss')
      });

      if (this.id > 5) {
        this.items.pop();
      }
    },
    genLog() {
      const color = this.genColor();
      return {
        color,
        icon: this.genIcon(color)
      };
    },
    genColor() {
      return COLORS[Math.floor(Math.random() * 2)];
    },
    genIcon(color) {
      return ICONS[color];
    }
  }
};
</script>
