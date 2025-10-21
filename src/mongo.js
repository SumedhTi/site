export const API = "https://site-9f5n.onrender.com/";

export async function addNewData(poem, db) {
    const contentResponse = await fetch(API + 'add',{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
        "collection":db,
        "document": poem
        })
    })

    if (!contentResponse.ok) {
      throw new Error(`Failed to fetch content: ${contentResponse.status}`);
    }

    return contentResponse;

}

export async function editData(poem, db, id) {
  const contentResponse = await fetch(API + 'edit',{
      method:"POST",
      headers:{
          "Content-Type": "application/json",
      },
      body:JSON.stringify({
      "collection":db,
      "filter": {id:id},
      "update": { $set: poem },
      })
  })

  if (!contentResponse.ok) {
    throw new Error(`Failed to fetch content: ${contentResponse.status}`);
  }

  return contentResponse;
}

export async function editLikes(db, id, inc) {
  const contentResponse = await fetch(API + 'edit',{
      method:"POST",
      headers:{
          "Content-Type": "application/json",
      },
      body:JSON.stringify({
      "collection":db,
      "filter": {id:id},
      "update": { $inc: { likes: inc }},
      })
  })

  if (!contentResponse.ok) {
    throw new Error(`Failed to fetch content: ${contentResponse.status}`);
  }

  return contentResponse;
}













