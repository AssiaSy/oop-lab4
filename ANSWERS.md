# Part 1

**Prediction 1.** Is any line underlined in red? What happens when you run the file?

=> NO there no underlined in red
after runnig it, we have a type error because the describe doesn't exist



**Question 1.** The `any` version avoids writing two classes. What did it give up? Would `memberList.add(42)` be caught?

=> it gave up the type checking, TypeScript doesn't know what comes out of the list anymore (it's `any`)
=> No, `memberList.add(42)` is not caught. It only crashes when running (42.getId is not a function)

///////////////////////////////////////////////////

# Part 2

**Question 2.** Two lines are underlined in red, with the same message. Copy it. Why does TypeScript refuse to call `getId()` on a `T`?

=> because typescript doestn't know what T represent 
Property 'getId' does not exist on type 'T'
///////////////////////////////////////////////////

**Question 3.** Neither `Book` nor `Member` says `implements HasId`. Why are they accepted?

=> Book and Member dont need to implement HasId because both classes already have a getId() method that can satisfy the interface
//////////////////////////////////////////////
### 2.2 Experiments
**Question 4**
=> the red line are 
(a) new Member("M-02", "Moussa")
(b) number
(c) found

(a)=> because we cannot add a "member" in a "book"
(b)=> because number doesnt have the getId() method therefore it doesn't satisfy the HasId() constraint
(c)=>`found` is possibly undefined because it returns `T | undefined`

### 2.3 Change the Inside, Not the Outside
**Prediction 2.** Do any of the test lines need to change? Run and check that the output is still Checkpoint 1.
=> No none of the test lines need to change.
///////////////////////////////////
The expected output remains exactly the same as Checkpoint 1.
**Question 5.** Why did no test line change?
=> Because we have encapsulation 
///////////////////////////////////
**Question 6.** Go back to the array version for a moment: suppose `all()` had simply returned `this.items`. Write one line of caller code that would then break the "no duplicate IDs" rule. Why does returning a new array prevent it?

=> Because returning this.items exposes the original internal array ans the caller can modify it directly and add duplicate IDs.
=> caller code: `catalog.all().push(new Book("B-001", "Another Copy"))`
=> a duplicate id gets in without passing by `add`. With a new array, the caller only changes the copy

/////////////////////////////
# Part 3

**Question 7.** Copy the red underline. The item returned is a `Dvd`, which has `describe()`. Why can TypeScript not see it?

=> Property 'describe' does not exist on type 'Borrowable'
=> because the return type is `Borrowable | undefined` and Borrowable only has `lateFee()`

**Prediction 3.** What type will `worstOverall` have? Will `worstOverall.describe()` be accepted?

=> type is `Book | Laptop | undefined`
=> `describe()` is not accepted cuz property 'describe' doesnt exist on type book has it but Laptop doesn't
=> but `worstOverall.lateFee(3)` works 

**Question 8.** `totalFees` did not need a type parameter; `mostCostly` did. Complete the rule: a generic is worth it when the function returns …

=> a generic is worth it when the function returns something whose type depends on the type of the input
=> totalFees always returns a number and mostCostly returns one of the items we gave, so T is needed. With [novel, laptop], T is inferred as `Book | Laptop`, that's why we see this union

///////////////////////////////////////////////////

# Part 4
**Question 9.** `Book` has no type parameter, yet it uses `Queue<T>`. Where is `T` chosen, and what is it? A teammate suggests `class Book extends Queue<string>` instead. Write one line of code that would then let someone skip the queue's rules.

=> T is chosen in `new Queue<string>()` inside Book, so T = string (member names)
=> with `extends Queue<string>`: `book.enqueue("Fatou")` skips borrow() and its rules

**Question 10.** `borrow("Moussa")` returned `false` the first time, and `false` again the second time. What happened to Moussa in each case? What can the caller not tell from a `boolean`?

=> first time: Awa had the book, so Moussa joined the queue
=> second time: Moussa was already waiting, so nothing changed
=> the caller can't know WHY it's false (queued? already waiting?), or his place in the queue

**Task 3. Mermaid diagram**

```
mermaid
classDiagram
  class Book {
    -string title
    -string borrower
    -Queue~string~ reservations
    +borrow(member) boolean
    +giveBack() boolean
    +getBorrower() string
    +waiting() number
  }
  class Queue~T~ {
    -T[] items
    +enqueue(item) void
    +dequeue() T
    +size() number
    +includes(item) boolean
  }
  Book "1" *-- "1" Queue : reservations
```

**Question 11.** Which relationship did you choose, and why?

=> composition (filled diamond), 1 to 1
=> Book creates and owns its queue, it's private and it disappears with the Book. Not inheritance because a Book is not a Queue (see Q9)

///////////////////////////////////////////////////

# Part 5

**Prediction 4.** Copy the red underline. Then run anyway: will it print `true`, `false`, or stop?

=> 'T' only refers to a type but is being used as a value here
=> it stops: ReferenceError: T is not defined

**Prediction 5.** There is no red underline. What do the two lines print?

=> Things Fall Apart
NaN
**Question 12.** Explain both results with one fact about what happens to types when `node` runs a `.ts` file. Where must data from outside the program be checked?

=> types are erased when node runs the file so T doesn't exist at runtime 
=> same for parseJson<BookData[]>: it's only a claim, JSON.parse checks nothing so copies is undefined and undefined + 1 = NaN
