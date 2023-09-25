import * as React from 'react';
import { flatten } from 'flat'

import { DataGrid, GridRowsProp, GridColDef, gridClasses, GridRowModel, GridValueFormatterParams } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';

const formatNumber = (params: GridValueFormatterParams<number>, type: string) => {
    if (params.value == null) {
        return '';
    }
    return `${Number(params.value).toFixed(2)} ${type}`;
}

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Id',
    },
    {
        field: 'name',
        headerName: 'Name',
    },
    {
        field: 'effective_status',
        headerName: 'Status',
    },
    {
        field: 'budget_remaining',
        headerName: 'Budget Remaining',
        align: 'right',
        valueFormatter: params => formatNumber(params, '$')
    },
    {
        field: 'insights.data.0.cost_per_inline_link_click',
        headerName: 'CPC',
        align: 'right',
        valueFormatter: params => formatNumber(params, '$')
    },
    {
        field: 'insights.data.0.cpm',
        headerName: 'CPM',
        align: 'right',
        valueFormatter: params => formatNumber(params, '$')
    },
    {
        field: 'insights.data.0.ctr',
        headerName: 'CTR',
        align: 'right',
        valueFormatter: params => formatNumber(params, '%')
    },
    {
        field: 'insights.data.0.impressions',
        align: 'right',
        headerName: 'Impressions'
    },
    {
        field: 'insights.data.0.reach',
        align: 'right',
        headerName: 'Reach'
    },
    {
        field: 'insights.data.0.spend',
        align: 'right',
        headerName: 'Spend'
    },
];

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    ['& .MuiDataGrid-columnHeader']: {
        backgroundColor: '#c1c1ff',
        fontSize: '1rem',
    },
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

interface Data {
    id: number;
    name: string;
    effective_status: string;
    budget_remaining: number;
    'insights.data.0.cost_per_inline_link_click': number;
    'insights.data.0.cpm': number;
    'insights.data.0.ctr': number;
    'insights.data.0.impressions': number;
    'insights.data.0.reach': number;
    'insights.data.0.spend': number;
}

interface Props {
    campaigns: Array<Data>
}

export default function AdsDataTableMain(props: Props) {
    let { campaigns } = props;
    let rows: GridRowsProp = campaigns.map((campaign) => {
        let flat: GridRowModel = flatten(campaign);
        return flat;
    });


    return (
        <div style={{ height: 500, width: '100%', backgroundColor: 'white' }}>
            <StripedDataGrid
                rowHeight={50}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
                rows={rows} columns={columns} />
        </div>
    );
}
