import React from 'react';
import { StyleSheet, PanResponder, Animated } from 'react-native'
import { Container, Content, Row, Badge, Text, List } from 'native-base';

import gStyle from './../gStyle.js';
import TaskCard from './TaskCard.js';


/*------------------------------------------------------------------------------
-----Props----------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
------------------------------------------------------------------------------*/

const DBG = true;
// const DBG = false;

const DBG_DATA = false;

  // DayView segment structure
const HOURS_TO_RENDER = 24;
const BLOCK_SIZE = 15;

// Derived values (Do not modify directly)
const SEGMENTS_PER_HOUR = 60 / BLOCK_SIZE;
const SEGMENTS_TO_RENDER = HOURS_TO_RENDER * SEGMENTS_PER_HOUR;

// User settings
const TWENTYFOUR_HOUR = false;
let theme = 'default';

// Time constants
const DAYS = 24 * 60 * 60 * 1000;

// Maximum number of parallel tasks to display
const MAX_TASK_WIDTH = 5;

// Style variables
const SEGMENT_HEIGHT = 50;
const ICON_HEIGHT = SEGMENT_HEIGHT*2;
const RIGHT_MARGIN = 20;
const BADGE_MARGIN_LEFT = 3;
const BADGE_MARGIN_RIGHT = 20;
const BADGE_WIDTH = 58;
const BADGE_SPACE = BADGE_MARGIN_LEFT + BADGE_MARGIN_RIGHT + BADGE_WIDTH;
const CARD_NONOVERLAP = 30; 



export default class DayView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollable: true,
      day: 0,
      chronoTasks: [],
    }
    
    this.setScrollable = this.setScrollable.bind(this);
    this.scrollView = null;
    
    if(DBG) console.log('constructor props:', props);
    
  }

  componentDidMount() {
      // Fill state with local info
    if(DBG_DATA) {
      let chronoTasks = this.genChronoList(testData);
      return
    }
    this.genChronoList()
  }

  componentWillReceiveProps(newProps) {
    if(DBG) console.log('newProps:', newProps);
    
    this.genChronoList(newProps.tasksToRender);
  }

  genChronoList(props = this.props.tasksToRender) {
    let chronoList = [];
    if(DBG) console.log('props:', props);
    if(DBG) console.log('this.props.tasksToRender:', this.props.tasksToRender);
        
    props.forEach((task, index) => {
      let block = 0
      console.log('task.starttime:', task.starttime );
      
      if(task.starttime > DAYS) {
        if(DBG) console.log('Over a day: task.starttime:', task.starttime);
        
        block = this.trimDay(task.starttime);
        block = this.toBlock(block);
      } else {
        if(DBG) console.log('Under a day: task.starttime:', task.starttime);
        block = this.toBlock(task.starttime);
      }
      
      if(DBG) console.log('block:', block);
      
      
      if (block > SEGMENTS_TO_RENDER) {
        console.log(`Something went wrong! Day overflowed with block #${block} for task: ${task}`);
      }
      let duration = this.toBlock(task.duration);

      chronoList[block] = [
        index,
        duration,
      ]
    })

    if(DBG) console.log('chronoList:', chronoList);
    

    this.setState({chronoTasks: chronoList})
    return chronoList
  }

  trimDay(time) {
      // Find time after midnight;
    return (time % DAYS)
  }

  addDay(time) {
    // Combine time after midnight with current day for complete unix time
    return time + DAYS * this.state.day;
  }

  toBlock(time) {
      // Convert to segment index
      return (time / (BLOCK_SIZE*60*1000)) // (converts minutes to ms)
  }
  
  setNewTimes(id, newStart, newHeight) {

    if(isNaN(newStart) || !newStart) {
      newStart = this.props.tasksToRender[id].blockStart*SEGMENT_HEIGHT;
    }
    if(isNaN(newHeight)) {
      newHeight = this.props.tasksToRender[id].blockDuration*SEGMENT_HEIGHT;
    }
    
    newStart = Math.max(0, newStart);
    newHeight = Math.max(1, newHeight);
    
    let newCardStats = {...this.props.tasksToRender[id],
      blockStart: Math.floor((newStart / SEGMENT_HEIGHT)),
      blockDuration: Math.floor(((newHeight+SEGMENT_HEIGHT-1) / SEGMENT_HEIGHT))}
    

    let newList = [...this.props.tasksToRender];
    newList[id] = { ...newList[id], ...newCardStats }
    
    // this.setState({tasks: [...newList]});
    
  }

  /*------------------------------------------------------------------------------
  -----Renders the timeline for the day-------------------------------------------
  ------------------------------------------------------------------------------*/
  renderTimeline() {
    let timeArr = [];
    let time = 1; // Represents the hour
    let tag = 'am'
    // If in 24H mode the tag is removed
    if (TWENTYFOUR_HOUR) {
      tag = '';
    }
    // Cycles through the day segments, generating one by one
    for (let i = 0; i < SEGMENTS_TO_RENDER; i++) {
      // Determines if the day segment is on the hour
      if (i % 4 === 0) {
        timeArr.push(
          /*--------------------------------------------------------------------
          -----On-hour display segement-----------------------------------------
          --------------------------------------------------------------------*/
          <Row style={styles.daySectionHour} key={i}>
            <Badge style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>{time}{tag}</Text>
            </Badge>
          </Row>
        )
        // Increment the hour display
        time++;
        // Check for rollover to PM
        if (time > 12 && !TWENTYFOUR_HOUR) {
          time = time - 12;
          tag = 'pm';
        }
      } else { // Fills between-hour segments
        timeArr.push(
          /*-------------------------------------------------------------------
          -----Non-hour row display--------------------------------------------
          -------------------------------------------------------------------*/
          <Row style={styles.daySection} key={i}>
          </Row>
        )
      }
    }
    return timeArr;
  }

  /*------------------------------------------------------------------------------
  -----Renders cards by absolute positioning--------------------------------------
  ------------------------------------------------------------------------------*/
  renderTaskCards() {
    // let cardArr = [];
    // let xSlots = [];
    // let rightIndent = [0];
    // let taskCount = 0;
    
    //   // Cycles through the entire day to find cards to fit in each timeslot
    // for(let i=0; i<SEGMENTS_TO_RENDER; i++){
    //     // Cycles through all tasks. Find tasks to insert
    //   this.state.chronoTasks.forEach((task, index) =>{
    //       // Checks to see if a task belongs in the current timeslot
    //       // console.log('task:', task);
    //     if(task) {
    //       if(task.blockStart === i) {
    //           // Set the initial style object that determines
    //           //   positioning and width
    //         let cardTop = task.blockStart*SEGMENT_HEIGHT;
    //         let cardHeight = task.blockDuration*SEGMENT_HEIGHT;
    //         let indentLeft = 0;
    //         let indentRight = 0;

    //         let rightAdjusted = false;
    //         // Finds the furthest-left open slot to fit the left border to
    //         for (let i = 0; i < MAX_TASK_WIDTH; i++) {
    //           if (!(xSlots[i] > 0)) {
    //             xSlots[i] = task.blockDuration;
    //             indentLeft = CARD_NONOVERLAP*i;
    //             i++;

    //             // Attempts to see if a previous card is being completely
    //             //   hidden, and if so brings in right border
    //             for (i; i < MAX_TASK_WIDTH; i++) {
    //               if (xSlots[i] > 0) {
    //                 for (let x = 0; x < rightIndent.length + 1; x++) {
    //                   if (!(rightIndent[x] > 0)) {
    //                     rightAdjusted = true;
    //                     indentRight = CARD_NONOVERLAP*x;
    //                   }
    //                 }
    //               }
    //             }
    //             // Keeps track of whether the right border is filled by a
    //             //   task card using the default border
    //             if (!rightAdjusted && task.blockDuration > rightIndent[0]) {
    //               rightIndent[0] = task.blockDuration;
    //             }
    //           }
    //         }
            
    //           // Pushes the current card with styling onto the timeline
    //         cardArr.push(
    //           <TaskCard
    //             key={task.id}
    //             id={task.id}
    //             scrollable={this.setScrollable}
    //             segmentHeight={SEGMENT_HEIGHT}
    //             color={task.color}
    //             title={task.title}
    //             setNewTimes={(x, y, z) => this.setNewTimes(x, y, z)}
    //             cardTop={cardTop}
    //             cardHeight={cardHeight}
    //             cardLeft={BADGE_SPACE + indentLeft}
    //             cardRight={RIGHT_MARGIN + indentRight} />
    //         )

    //         // Registers that a task was added to the calendar
    //         taskCount++;
    //       }
    //     }
    //   })

    //   // Tracks the length of cards to update left and right border spaces
    //   for (let i = 0; i < xSlots.length; i++) {
    //     if (xSlots[i] > 0) {
    //       xSlots[i] = xSlots[i] - 1;
    //     }
    //     if (rightIndent[i] > 0) {
    //       rightIndent[i] = rightIndent[i] - 1;
    //     }
    //   }
    //   // Ends the render list early if all tasks have been added
    //   if (taskCount === this.props.tasksToRender.length) {
    //     i = SEGMENTS_TO_RENDER;
    //   }
    // }

    // return cardArr;
    let cardArr = []
    this.state.chronoTasks.forEach((task, index) => {
      if(!isNaN(task[0])) {

      }
    })
  }

  scrollToTime() {
    let time = new Date().getTime();
    
    time = this.trimDay(time);
    console.log('new Date(time):', new Date(time));
    
    console.log('time:', time);
    
    time = this.toBlock(time);
    console.log('time:', time);
    
    
  }

  setScrollable(e) {
    this.setState({scrollable: e})
  }

  render() {
    return (
      <Content style={styles.viewContainer}
        scrollEnabled={this.state.scrollable}
        // ref={ref => {this.scrollView = ref}}
        ref='scrollView'
        onLayout={() => this.scrollToTime()}>
        <Text>{this.props.day}</Text>
        {/* <Text>{this.state.scrollable ? 'Scrollable' : 'nonscrolling'}</Text> */}
        {/* <List scrollEnabled={false}> */}
        {this.renderTimeline()}

        {/* </List> */}
        {this.renderTaskCards()}
        
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: '#000',
  },
  taskCard: {
    position: 'absolute',
    display: 'flex',
    left: BADGE_SPACE,
    right: 0,
  },
  viewContainer: {
    display: 'flex',
    flex: 1,
    // position: 'relative',
    backgroundColor: gStyle[theme].dark,
  },
  daySection: {
    height: SEGMENT_HEIGHT,
    backgroundColor: gStyle[theme].background,
    borderTopWidth: 1,
    borderColor: gStyle[theme].light,
    flexDirection: 'row',
    paddingLeft: BADGE_SPACE,
  },
  daySectionHour: {
    height: ICON_HEIGHT,
    backgroundColor: gStyle[theme].background,
    marginBottom: -SEGMENT_HEIGHT,
    borderTopWidth: 2,
    borderColor: gStyle[theme].dark,
    flexDirection: 'row',
  },
  timeBadge: {
    alignSelf: 'flex-start',
    width: BADGE_WIDTH,
    marginRight: BADGE_MARGIN_RIGHT,
    marginLeft: BADGE_MARGIN_LEFT,
    marginTop: 1,
    backgroundColor: gStyle[theme].dark,
    height: 25,
  },
  timeBadgeText: {
    color: gStyle[theme].fontLight,
  }
});



let testData = [
  {
    taskid: 1,
    taskname: 'Card one',
    color: '#EEEEEE',
    starttime: 1*60*60*1000,
    duration: 3*15*60*1000,
  },
  {
    taskid: 11,
    taskname: 'Card two',
    color: '#AAAAAA',
    starttime: 1*60*60*1000,
    duration: 1*15*60*1000,
  },
  {
    taskid: 12,
    taskname: 'Card three',
    color: '#AAAAAA',
    starttime: 2*60*60*1000,
    duration: 2*15*60*1000,
  },
  {
    taskid: 13,
    taskname: 'Card four',
    color: 'blue',
    starttime: 3*60*60*1000,
    duration: 2*15*60*1000,
  },
  {
    taskid: 14,
    taskname: 'Card five',
    color: 'green',
    starttime: 4*60*60*1000,
    duration: 5*15*60*1000,
  },
  {
    taskid: 15,
    taskname: 'Right 1',
    color: 'green',
    starttime: 11*60*60*1000,
    duration: 2*15*60*1000,
  },
  {
    taskid: 16,
    taskname: 'Right 2',
    color: 'blue',
    starttime: 12*60*60*1000,
    duration: 9*15*60*1000,
  },
  {
    taskid: 17,
    taskname: 'Right 3',
    color: 'green',
    starttime: 13*60*60*1000,
    duration: 5*15*60*1000,
  },
  {
    taskid: 18,
    taskname: 'Right 4',
    color: 'red',
    starttime: 14*60*60*1000,
    duration: 4*15*60*1000,
  },
  {
    taskid: 19,
    taskname: 'Right 4',
    color: 'purple',
    starttime: 15*60*60*1000,
    duration: 4*15*60*1000,
  },
  {
    taskid: 20,
    taskname: 'Right 5',
    color: 'green',
    starttime: 21*60*60*1000,
    duration: 2*15*60*1000,
  }
]