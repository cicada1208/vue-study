<template>
  <v-container>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(value, key) in typeToLabel"
                  @click="type = key"
                  :key="key"
                >
                  <v-list-item-title>{{ value }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <!-- @change: 日曆上顯示的天數範圍更改時觸發。 -->
          <!-- @click:day: 某天的點擊事件。 -->
          <!-- @mouseup:time: day 視圖中特定時間 mouseup 事件。 -->
          <v-calendar
            ref="calendar"
            locale="zh-tw"
            :month-format="
              (timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'
            "
            :day-format="(timestamp) => new Date(timestamp.date).getDate()"
            v-model="focus"
            :type="type"
            :events="events"
            :event-color="getEventColor"
            @change="getEvents"
            @click:date="viewDay"
            @click:more="viewDay"
            @click:day="insertEvent"
            @mouseup:time="insertEvent"
            @mouseup:event="showEvent"
            color="primary"
          >
            <!-- v-slot:event: 調整事件內容顯示 -->
            <template v-slot:event="{ event, eventParsed }">
              <div v-if="type === 'month'" class="pl-1">
                {{ eventParsed.start.time + ' ' + event.name }}
              </div>
              <div v-else class="pl-1">
                {{ event.name }}
                <br />
                {{ eventParsed.start.time + ' - ' + eventParsed.end.time }}
              </div>
            </template>
          </v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteEvent(selectedEvent)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment';

export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      '4day': '4 Days',
      day: 'Day',
    },
    events: [],
    names: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Birthday',
      'Conference',
      'Party',
    ],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    catNotInsert: false,
  }),
  methods: {
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
        const details =
          moment(first).format('YYYY/MM/DD HH:mm') +
          ' - ' +
          moment(second).format('YYYY/MM/DD HH:mm');

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          start: first,
          end: second,
          timed: !allDay,
          details,
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    showEvent({ nativeEvent, event }) {
      this.catNotInsert = true;
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    insertEvent(dtm) {
      if (this.selectedOpen) return;
      if (this.catNotInsert) {
        this.catNotInsert = false;
        return;
      }

      let mouse = `${dtm.date}`;
      if (dtm.hasTime) mouse += `T${dtm.time}`;
      const start = moment(mouse).toDate();
      const end = moment(start)
        .add(1, 'hours')
        .toDate();
      const details =
        moment(start).format('YYYY/MM/DD HH:mm') +
        ' - ' +
        moment(end).format('YYYY/MM/DD HH:mm');

      this.events.push({
        name: `Event #${this.events.length}`,
        color: this.colors[this.rnd(0, this.colors.length - 1)],
        start,
        end,
        timed: true,
        details,
      });
    },
    deleteEvent(delEvent) {
      this.events = this.events.filter((e) => e !== delEvent);
      this.selectedOpen = false;
    },
    viewDay({ date }) {
      this.catNotInsert = true;
      this.focus = date;
      this.type = 'day';
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
  mounted() {
    // 檢查開始和結束日期的更改，如果更改，發出更改事件。
    this.$refs.calendar.checkChange();
  },
};
</script>
