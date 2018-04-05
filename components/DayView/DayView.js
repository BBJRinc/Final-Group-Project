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
    this.genChronoList()
  }

  componentWillReceiveProps(newProps) {
    if(DBG) console.log('newProps:', newProps);
    
    this.genChronoList(newProps.tasksToRender);
  }

  genChronoList(props = this.props.tasksToRender) {
    let chronoList = {};
    if(DBG) console.log('props:', props);
        
    props.forEach((task, index) => {
      let startBlock = 0
      if(task.starttime > DAYS) {
        startBlock = this.trimDay(task.starttime);
        startBlock = this.toBlock(startBlock);
      } else {
        startBlock = this.toBlock(task.starttime);
      }
      
      if (startBlock > SEGMENTS_TO_RENDER) {
        console.log(`Something went wrong! Day overflowed with startBlock #${startBlock} for task: ${task}`);
      }
      let blockDuration = this.toBlock(task.duration);

      chronoList[task.taskid] = {
        index,
        startBlock,
        blockDuration,
      }
    })

    if(DBG) console.log('chronoList:', chronoList);
    

    this.setState({chronoTasks: chronoList})
    if(DBG) console.log('this.state.chronoTasks:', this.state.chronoTasks);
    
    return chronoList
  }

  trimDay(time) {
      // Find time after midnight;
    return (time % DAYS)
  }

  addDay(time) {
    if(DBG) console.log('this.props.day:', this.props.day);
    
    // Combine time after midnight with current day for complete unix time
    return time + this.props.day;
  }

  toBlock(time) {
      // Convert to segment index
      return (time / (BLOCK_SIZE*60*1000)) // (converts minutes to ms)
  }

  blockToTime(block) {
    return block * BLOCK_SIZE * 60 * 1000;
  }
  
  setNewTimes(id, newStart, newHeight) {
    let index = this.state.chronoTasks[id].index
    let taskData = this.props.tasksToRender[index];
    // let updated = false;
      // Checks if the values fed in exist and if not pulls from state
    if(isNaN(newStart)) {
      if(DBG) console.log('newStart:', newStart);
      
      newStart = this.state.chronoTasks[id].startBlock*SEGMENT_HEIGHT;
      // noUpdate = true;
    }
    if(isNaN(newHeight)) {
      if(DBG) console.log('newHeight:', newHeight);
      
      newHeight = this.state.chronoTasks[id].blockDuration*SEGMENT_HEIGHT;
      // noUpdate = true;
    }

    // if(noUpdate) {
    //   if(DBG) console.log('No update to task times');
      
    //   return;
    // }
    
      // Ensures tasks stay within the bounds of the day view
    newStart = Math.max(0, newStart);
    newHeight = Math.max(SEGMENT_HEIGHT, newHeight);
    let latestPossibleTime = SEGMENT_HEIGHT*SEGMENTS_TO_RENDER-newHeight
    newStart = Math.min(latestPossibleTime, newStart)
    
      // Converts from pixel height to block height
    let startBlock = Math.floor((newStart / SEGMENT_HEIGHT));
    let blockDuration = Math.floor(((newHeight+SEGMENT_HEIGHT-1) / SEGMENT_HEIGHT))
    
    let newTask = {
      ...this.state.chronoTasks[id],
      newStart,
      newHeight,
    }
    let newList = {...this.state.chronoTasks};
    newList[id] = newTask;

    this.setState({chronoTasks: newList})
    if(DBG) console.log('this.state.chronoTasks:', this.state.chronoTasks);
    
      // Converts from block height to time
    let newStartTime = this.blockToTime(startBlock);
    if(!taskData.isrecurring) {
      if(DBG) console.log('This is a nonrecurring task');
      newStartTime = this.addDay(newStartTime)
    }
    let newDuration = this.blockToTime(blockDuration)

    if(DBG) console.log('newStartTime:', newStartTime);
    if(DBG) console.log('newDuration:', newDuration);
    
    this.props.changeTimes(id, newStartTime, newDuration);
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
    let cardArr = [];
    let xSlots = [];
    let rightIndent = [0];
    let taskCount = 0;
    
      // Cycles through the entire day to find cards to fit in each timeslot
    for(let i=0; i<SEGMENTS_TO_RENDER; i++) {
        // Cycles through all tasks. Find tasks to insert
      for(let key in this.state.chronoTasks) {
        let task = this.state.chronoTasks[key];
        let taskData = this.props.tasksToRender[task.index];
        
          // Checks to see if a task belongs in the current timeslot
          // console.log('task:', task);
        if(task.startBlock === i) {
          
            // Set the initial style object that determines
            //   positioning and width
          let cardTop = task.startBlock*SEGMENT_HEIGHT;
          let cardHeight = task.blockDuration*SEGMENT_HEIGHT;
          let indentLeft = 0;
          let indentRight = 0;

          let rightAdjusted = false;
          // Finds the furthest-left open slot to fit the left border to
          for (let i = 0; i < MAX_TASK_WIDTH; i++) {
            if (!(xSlots[i] > 0)) {
              xSlots[i] = task.blockDuration;
              indentLeft = CARD_NONOVERLAP*i;
              i++;

              // Attempts to see if a previous card is being completely
              //   hidden, and if so brings in right border
              for (i; i < MAX_TASK_WIDTH; i++) {
                if (xSlots[i] > 0) {
                  for (let x = 0; x < rightIndent.length + 1; x++) {
                    if (!(rightIndent[x] > 0)) {
                      rightAdjusted = true;
                      indentRight = CARD_NONOVERLAP*x;
                    }
                  }
                }
              }
              // Keeps track of whether the right border is filled by a
              //   task card using the default border
              if (!rightAdjusted && task.blockDuration > rightIndent[0]) {
                rightIndent[0] = task.blockDuration;
              }
            }
          }
          
            // Pushes the current card with styling onto the timeline
          cardArr.push(
            <TaskCard
              key={key}
              id={key}
              fullTask={this.props.tasksToRender[task.index]}
              scrollable={this.setScrollable}
              setNewTimes={(x, y, z) => this.setNewTimes(x, y, z)}
              onTaskPress={this.props.onTaskPress}
              segmentHeight={SEGMENT_HEIGHT}
              color={taskData.color}
              title={taskData.taskname}
              cardTop={cardTop}
              cardHeight={cardHeight}
              cardLeft={BADGE_SPACE + indentLeft}
              cardRight={RIGHT_MARGIN + indentRight} />
          )

          // Registers that a task was added to the calendar
          taskCount++;
        }
      }

      // Tracks the length of cards to update left and right border spaces
      for (let i = 0; i < xSlots.length; i++) {
        if (xSlots[i] > 0) {
          xSlots[i] = xSlots[i] - 1;
        }
        if (rightIndent[i] > 0) {
          rightIndent[i] = rightIndent[i] - 1;
        }
      }
      // Ends the render list early if all tasks have been added
      if (taskCount === this.props.tasksToRender.length) {
        i = SEGMENTS_TO_RENDER;
      }
    }
    return cardArr;
  }

  scrollToTime() {
    let time = new Date().getTime();
    
    time = this.trimDay(time);
    if (DBG) console.log('new Date(time):', new Date(time));
    
    if (DBG) console.log('time:', time);
    
    time = this.toBlock(time);
    if (DBG) console.log('time:', time);
    
    
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