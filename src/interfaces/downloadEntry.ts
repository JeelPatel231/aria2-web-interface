interface BittorrentInterface{
    announceList: string[],
    info : {
        name: string,
    }
    mode: string,
}

interface UriInterface{
    status : string,
    uri: string,
}

interface FileInterface{
    completedLength: string,
    index: string,
    length: string,
    path: string,
    selected: string,
    uris: UriInterface[];
}
export interface DownloadDataEntry{
    //common
    completedLength: string,
    connections: string,
    downloadSpeed: string,
    files: FileInterface[],
    gid: string,
    numPieces: string,
    pieceLength: string,
    status: string,
    totalLength: string,
    uploadLength: string,
    uploadSpeed: string,

    // urls
    
    // bittorrent
    bittorrent: BittorrentInterface,
    numSeeders: string,
}
