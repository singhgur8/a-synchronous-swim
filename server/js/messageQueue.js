const messages = []; // the storage unit for messages
//server requsets seem to be skipping every other deque...


module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
  //console.log('Queue:' + messages);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  //console.log('Dequeueing Message');
  return messages.shift();
};