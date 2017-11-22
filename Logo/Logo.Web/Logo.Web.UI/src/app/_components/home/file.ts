export class File {
    FileId: string;
    parentFolderId: string;
    ownerId: string;
    name: string;
    creationDate: Date;
    uploadDate: Date;
    hasPublicAccess: boolean;
    tagList: string[];
}