* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.homepage {
    padding: 20px;                
    max-width: 800px;             
    margin: 0 auto;               
}

.posts-container {
    display: flex;
    flex-direction: column;
    gap: 20px;                    
    margin: 0;                    
}

.post-tile {
    border: 1px solid #000;       
    border-radius: 12px;          
    padding: 20px;                
    background-color: #fff;      
    display: flex;                
    flex-direction: column;       
    gap: 20px;                    
    margin: 0;                    
}

.post-title {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin: 0;    
    align-self: flex-start;                
}

.post-preview-container {
    border: 1px solid #000;       
    padding: 15px;                
    border-radius: 4px;           
    margin: 0;                   
}

.read-more-container {
    display: flex;                
    justify-content: flex-end;    
    margin-top: 10px;             
}

.read-more-btn {
    text-decoration: none;        
    color: #000;                  
    border: 1px solid #000;       
    padding: 5px 10px;            
    font-weight: bold;
    text-align: center;
    margin: 0;                    
}  

.post-image {
    width: 100%;
    height: auto;
    margin-top: 16px;
    border-radius: 8px;
  }
    
.post-metadata {
    display: flex;
    justify-content: flex-start;  
    font-size: 14px;
    color: #333;
    gap: 20px;                    
    margin: 0;                    
    padding: 0;                   
}