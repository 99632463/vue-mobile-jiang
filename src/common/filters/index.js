const formatPlayCount = count => {
  if(count / 100000000 > 1){
    if((count / 100000000).toString().includes('.')){
      return (count / 100000000).toFixed(1) + '亿';
    }
    return count / 100000000 + '亿';
  }
  if(count / 10000 > 1){
    if((count / 10000).toString().includes('.')){
      return (count / 10000).toFixed(1) + '万';
    }
    return count / 10000 + '万';
  }
  return count;
}

export {
  formatPlayCount
}