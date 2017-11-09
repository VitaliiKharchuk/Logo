export class Folder {
    folderId: string;
    ownerId: string;
    parentFolderId: string;
    name: string;
    creationDat: Date;
    uploadDate: Date;
    level: Int32Array;
    hasPublicAccess: boolean
}