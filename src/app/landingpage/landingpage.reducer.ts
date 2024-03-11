import * as LandActions from "./landingpage.actions";

const initialState = {
    groupsData: [
        { groupId: 0, 'groupName': 'firebite', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
        { groupId: 1, 'groupName': 'dreamgames', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
        { groupId: 2, 'groupName': 'talksns', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
        { groupId: 3, 'groupName': 'bitefiregames', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
        { groupId: 4, 'groupName': 'games', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
        { groupId: 5, 'groupName': 'arcade games', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
        { groupId: 6, 'groupName': 'websites', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
        { groupId: 7, 'groupName': 'top websites', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
        { groupId: 8, 'groupName': 'android games', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
        { groupId: 9, 'groupName': 'web technologies', 'groupDesc': '... nothing ...', 'createdAt': new Date() },
    ]
};

export function landingpageReducer(state = initialState, action: LandActions.groupActions | any) {

    switch(action.type){
        case LandActions.ADD_GROUP:
            return {
                ...state, groupsData: [...state.groupsData, action.payload]
            };

            case LandActions.DELETE_GROUP:
                return {
                    ...state, groupsData: state.groupsData.filter(group => group.groupId !== action.groupId)
                };

        default:
            return {
                ...state
            }
    }
}