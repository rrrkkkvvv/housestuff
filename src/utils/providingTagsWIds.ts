export const providesList = <R extends {records: {id: string | number}[]}, T extends string>(
    result: R | undefined,
    tagType : T
)=>{
    return result 
    ? result.records.map(({id})=>({type: tagType, id: id})) : [{ type: tagType}]
}