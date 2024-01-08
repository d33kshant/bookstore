const fs = require("fs");
const { parse } = require("csv");
const { exit } = require("process");
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const 
ISBN = 0,
TITL = 2,
AUTH = 4,
CATE = 5,
THUM = 6,
DESC = 7,
YEAR = 8,
RATE = 9,
PAGE = 10,
VOTE = 11

let count = 0

fs.createReadStream("data.csv")
.pipe(parse({ delimiter: ',', from_line: 2 }))
.on("data", async row => {
  const isbn = row[ISBN]
  const title = row[TITL]
  const authors = row[AUTH]
  const categories = row[CATE]
  const thumbnail = row[THUM]
  const description = row[DESC]
  const published_year = row[YEAR]
  const average_rating = +row[RATE]
  const num_pages = +row[PAGE]
  const ratings_count = +row[VOTE]

  if (!isbn || !title || !authors || !categories || !thumbnail || !description || !published_year || !average_rating || !num_pages || !ratings_count) {
    return
  }

  const original_price = (Math.random() * 10 + 1) * 5
  const selling_price = original_price - (Math.random() * 5)

  const book = await prisma.book.create({
    data: {
      isbn,
      title,
      authors,
      categories,
      thumbnail,
      description,
      published_year,
      average_rating,
      num_pages,
      ratings_count,
      original_price,
      selling_price,
    }
  })
  if (book) count++;
})
.on("end", ()=>{
  console.log(count, "Entries added")
})
