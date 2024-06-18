export async function getToken(){
  const tokenResponse = await fetch("https://ap-south-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-rcfyhhz/auth/providers/local-userpass/login",{
      method:"POST",
      headers:{
          "Content-Type" : "application/json"
      },
      body:JSON.stringify({"username": "all","password": "everyone"})
  });
  
  if (!tokenResponse.ok) {
    throw new Error(`Failed to fetch token: ${tokenResponse.status}`);
  }
  
  const token = await tokenResponse.json();

  return token;

}


export async function getAllData (token, db) {
    try {
    
        // Use the token to fetch content
        const contentResponse = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/data-rcfyhhz/endpoint/data/v1/action/find',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Authorization": "Bearer " + token
            },
            body:JSON.stringify({
            "collection":db,
            "database":"poem",
            "dataSource":"Cluster0",
            "projection": {}
            })
        })
    
        if (!contentResponse.ok) {
          throw new Error(`Failed to fetch content: ${contentResponse.status}`);
        }
    
        const content = await contentResponse.json(); // Or text() for non-JSON data

        return content;
        

      } catch (error) {
        console.error('Error fetching content:', error);
        return null; // Or throw an error if handling is needed elsewhere
      }
} 


export async function addNewData(token, poem, db) {
    const contentResponse = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/data-rcfyhhz/endpoint/data/v1/action/insertOne',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Authorization": "Bearer " + token
        },
        body:JSON.stringify({
        "collection":db,
        "database":"poem",
        "dataSource":"Cluster0",
        "document": poem
        })
    })

    if (!contentResponse.ok) {
      throw new Error(`Failed to fetch content: ${contentResponse.status}`);
    }

    return contentResponse;

}

export async function editData(token, poem, db, id) {
  const contentResponse = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/data-rcfyhhz/endpoint/data/v1/action/updateOne',{
      method:"POST",
      headers:{
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "Authorization": "Bearer " + token
      },
      body:JSON.stringify({
      "collection":db,
      "database":"poem",
      "dataSource":"Cluster0",
      "filter": {id:id},
      "update": poem,
      "upsert": false
      })
  })

  if (!contentResponse.ok) {
    throw new Error(`Failed to fetch content: ${contentResponse.status}`);
  }

  return contentResponse;
}

export async function editLikes(token, db, id, inc) {
  const contentResponse = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/data-rcfyhhz/endpoint/data/v1/action/updateOne',{
      method:"POST",
      headers:{
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "Authorization": "Bearer " + token
      },
      body:JSON.stringify({
      "collection":db,
      "database":"poem",
      "dataSource":"Cluster0",
      "filter": {id:id},
      "update": { $inc: { likes: inc }},
      "upsert": false
      })
  })

  if (!contentResponse.ok) {
    throw new Error(`Failed to fetch content: ${contentResponse.status}`);
  }

  return contentResponse;
}













