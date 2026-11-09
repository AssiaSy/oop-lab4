class Book {
  private id: string;
  private title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  getId(): string {
    return this.id;
  }

  describe(): string {
    return `${this.title} [${this.id}]`;
  }
}

class Member {
  private id: string;
  private name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}


/*
class AnyList {
  private items: any[] = [];

  add(item: any): boolean {
    if (this.find(item.getId()) !== undefined) return false;
    this.items.push(item);
    return true;
  }

  find(id: string): any {
    for (const item of this.items) {
      if (item.getId() === id) return item;
    }
    return undefined;
  }
}

const memberList = new AnyList();
memberList.add(new Member("M-01", "Awa"));

const awa = memberList.find("M-01");
console.log(awa.getName());
console.log(awa.describe());

*/
interface HasId {
  getId(): string;
}

class Catalog<T extends HasId> {
    private items = new Map<string, T>();

    add(item: T): boolean {
        if (this.items.has(item.getId())) {
            return false;
        }

        this.items.set(item.getId(), item);
        return true;
    }

    find(id: string): T | undefined {
        return this.items.get(id);
    }

    count(): number {
        return this.items.size;
    }

    all(): T[] {
        return Array.from(this.items.values());
    }
}
const books = new Catalog<Book>();
console.log(books.add(new Book("B-001", "Things Fall Apart")));
console.log(books.add(new Book("B-002", "So Long a Letter")));
console.log(books.add(new Book("B-001", "Another Copy")));

const members = new Catalog<Member>();
members.add(new Member("M-01", "Awa"));

console.log(books.count(), members.count());

const found = books.find("B-002");
if (found) console.log(found.describe());

const awa = members.find("M-01");
if (awa) console.log(awa.getName());

console.log(books.find("B-999"));

books.add(new Member("M-02", "Moussa"));   // (a)
const numbers = new Catalog<number>();     // (b)
console.log(found.describe());             // (c) without the if