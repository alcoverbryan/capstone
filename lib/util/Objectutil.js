const ObjectUtil = {
    makeObjSerializable: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },
};

export default ObjectUtil;