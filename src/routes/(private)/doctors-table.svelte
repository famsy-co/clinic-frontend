<script lang="ts">
    import { Search , Plus , Minus , Edit3} from "svelte-feathers";
    import { m } from "$lib";
    import { scale } from 'svelte/transition';
    import Button from "./button.svelte";

    let search = $state(false)
    const doctors = [{fullName: 'مهران احمدی', doctoralCode: '336584' , specialty: 'فوق تخصص مغز و اعصاب'},{fullName: 'مهران احمدی', doctoralCode: '336584' , specialty: 'فوق تخصص مغز و اعصاب'}]

</script>

<div class="m-20 mt-14 rounded-2xl border border-dark-main-100 min-h-[180px]">
    <div class="flex flex-grow justify-between items-center h-12 p-8 rounded-t-2xl text-2xl text-foreground-100
                bg-gradient-to-l from-dark-main-100 to-main-100">
        <p>{m.office_home_doctors()}</p>

        <div class="flex gap-5">
            <button class="transition active:scale-95" transition:scale>
                <Search />
            </button>
            <button class="transition active:scale-95" transition:scale> 
                <Plus/>
            </button>    
        </div>        

    </div>

    <table class="w-full table-fixed">
        <thead class="px-8">
            <tr>
                <th class="w-1/5 py-4">{m.general_order()}</th>
                <th class="w-1/5 py-4">{m.office_home_doctor_name()}</th>
                <th class="w-1/5 py-4">{m.office_home_doctoralCode()}</th>
                <th class="w-1/5 py-4">{m.office_home_specialty()}</th>
                <th class="w-1/5 py-4"></th>
            </tr>
        </thead>
        <tbody class="px-8">
            {#each doctors as doctor , index}
                <tr class="px-8 border-t-[1px] border-b-dark-main-10">
                    <td class="py-4 text-center">{index + 1}</td>
                    <td class="py-4 text-center">{doctor.fullName}</td>
                    <td class="py-4 text-center">{doctor.doctoralCode}</td>
                    <td class="py-4 text-center">{doctor.specialty}</td>
                    <td class="py-4 text-left pl-7">
                        <Button class="bg-soft-100 ml-4">
                            <Edit3 class="m-auto size-5"/>
                        </Button>
                        <Button class="bg-error-100">
                            <Minus class="m-auto size-5"/>
                        </Button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>