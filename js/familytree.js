class FamilyTree extends FTDrawer {

    constructor(data, svg) {
        const ft_datahandler = new FTDataHandler(data);
        super(ft_datahandler, svg);
    };

};